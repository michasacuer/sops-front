import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UserInfo } from './models/user-info';
import { Observable, Subject, of } from 'rxjs';
import { UserCredentials } from './models/user-credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { TokenResponse } from './models/token-response';
import { CookieService } from 'ngx-cookie-service';

const authUserDataCookieKey = 'authTokenCookieKey';


class UserData {
  public userInfo: UserInfo;
  public tokenResponse: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfoSubject = new Subject<UserInfo>();
  private userData = new UserData();

  constructor(private http: HttpClient,
    private api: ApiService,
    private dataService: DataService,
    private cookieService: CookieService) {
    if (this.cookieService.check(authUserDataCookieKey)) {
      const cookieData = this.cookieService.get(authUserDataCookieKey);
      if (cookieData.length > 0) {
        this.userData = JSON.parse(this.cookieService.get(authUserDataCookieKey));
        console.log(this.userData);
      }
    }
  }

  public get userInfo(): Observable<UserInfo> {
    if (this.userData.userInfo) {
      return of(this.userData.userInfo);
    }
    return this.userInfoSubject;
  }

  public signIn(credentials: UserCredentials) {
    const url = `${this.api.getBaseUrl()}Token`;
    const token = `grant_type=password&username=${credentials.email}&password=${credentials.password}`;

    this.http.post<TokenResponse>(url, token).subscribe(((tokenResponse) => {
      this.userData.tokenResponse = tokenResponse.access_token;
      this.dataService.getObjectByUrl(UserInfo, 'Api/Account/UserInfo/').subscribe((userInfo) => { // switchmap?
        console.log(userInfo);
        this.userData.userInfo = userInfo;
        this.cookieService.set(authUserDataCookieKey, JSON.stringify(this.userData));
        this.userInfoSubject.next(userInfo);
      });
    }));
  }

  public signOut() {
    this.cookieService.set(authUserDataCookieKey, '');
    this.userData = new UserData();
    this.userInfoSubject.next(this.userData.userInfo);
  }

  public get authorizationHeaderValue(): string {
    if (!this.userData.tokenResponse) {
      return null;
    }

    return this.userData.tokenResponse;
  }

  public get currentUserId(): string {
    return this.userData.userInfo == null ? null : this.userData.userInfo.id;
  }

  public get currentUserRole(): string {
    return this.userData.userInfo == null ? 'Guest' : this.userData.userInfo.role;
  }
}
