import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInfo } from '../models/user-info';
import { UserCredentials } from '../models/user-credentials';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public userInfo: UserInfo;
  public userCredentials: UserCredentials = new UserCredentials();
  public isLoginDialogOpen = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserInfo().subscribe((userInfo) => this.userInfo = userInfo);
  }

  onLoginClick() {
    this.isLoginDialogOpen = false;
    this.auth.signIn(this.userCredentials);
  }
}
