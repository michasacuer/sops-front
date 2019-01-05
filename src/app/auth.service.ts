import { Injectable } from '@angular/core';
import { DataService, DataResponse } from './data.service';
import { UserInfo } from './models/user-info';
import { Observable, Subject, of, BehaviorSubject, from, ReplaySubject } from 'rxjs';
import { UserCredentials } from './models/user-credentials';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { TokenResponse } from './models/token-response';
import { CookieService } from 'ngx-cookie-service';
import { UserRegister } from './models/user-register';
import { ErrorService } from './error.service';

const authUserDataCookieKey = 'authTokenCookieKey';


class UserData {
  public userInfo: UserInfo;
  public tokenResponse: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfoSubject = new ReplaySubject<DataResponse<UserInfo>>(1);
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

  public get userInfo(): Observable<DataResponse<UserInfo>> {
    if (this.userData.userInfo) {
      this.userInfoSubject.next(new DataResponse(this.userData.userInfo));
    }
    return this.userInfoSubject;
  }

  public signIn(credentials: UserCredentials): Observable<DataResponse<UserInfo>> {
    const credentialsString = `grant_type=password&username=${credentials.email}&password=${credentials.password}`;

    this.dataService.postObjectByUrl(credentialsString, 'Token').subscribe((credentialsResponse) => {
      if (!credentialsResponse.object) {
        this.userInfoSubject.next(credentialsResponse);
        return;
      }
      this.userData.tokenResponse = credentialsResponse.object.access_token;
      this.loadUserInfo();
    });

    return this.userInfoSubject;
  }

  public loadUserInfo() {
    this.dataService.getObjectByUrl(UserInfo, 'Api/Account/UserInfo/').subscribe((response) => { // switchmap?
      if (response.errorMessage) {
      } else {
        this.userData.userInfo = response.object;
        this.cookieService.set(authUserDataCookieKey, JSON.stringify(this.userData));
      }
      this.userInfoSubject.next(response);
    });
  }

  public register(registerData: UserRegister) {
    const url = `${this.api.getBaseUrl()}Api/Account/Register`;
    console.log(registerData);
    return this.http.post(url, registerData, {observe: 'response'});
  }

  public signOut() {
    this.cookieService.set(authUserDataCookieKey, '');
    this.userData = new UserData();
    this.userInfoSubject.next(new DataResponse(this.userData.userInfo));
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
