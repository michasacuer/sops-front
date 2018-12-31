import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInfo } from '../models/user-info';
import { UserCredentials } from '../models/user-credentials';
import { MatDialog } from '@angular/material';
import { AuthLoginDialogComponent } from '../auth-login-dialog/auth-login-dialog.component';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public userInfo: UserInfo;

  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.auth.userInfo.subscribe((userInfo) => this.userInfo = userInfo);
  }

  onLoginClick() {
    const dialogRef = this.dialog.open(AuthLoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.auth.signIn(result);
      }
    });
  }

  onLogoutClick() {
    console.log(this.auth.currentUserId);
    this.auth.signOut();
  }
}
