import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInfo } from '../models/user-info';
import { UserCredentials } from '../models/user-credentials';
import { MatDialog } from '@angular/material';
import { AuthLoginDialogComponent } from '../auth-login-dialog/auth-login-dialog.component';
import { EventEmitter } from 'protractor';
import { AuthRegisterDialogComponent } from '../auth-register-dialog/auth-register-dialog.component';
declare var clippyRef: any;

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

  onRegisterClick() {
    const dialogRef = this.dialog.open(AuthRegisterDialogComponent);
    dialogRef.componentInstance.registerEmitter.subscribe(() => {
      // console.log("try to login");
      // console.log(dialogRef.componentInstance.userRegister);
      this.auth.register(dialogRef.componentInstance.userRegister).subscribe((response) => {
        console.log(response.status);
        if (response.status === 200) {
          console.log('proba');
          dialogRef.close();
          clippyRef.stop();
          clippyRef.speak(`Witam w serwisie przyjacielu.`);
        }
      }, error => clippyRef.speak(`Taki użytkownik już istnieje, albo coś takiego.      Tak, teraz mówię po polsku.`)
      );
    });
  }

  onLogoutClick() {
    console.log(this.auth.currentUserId);
    this.auth.signOut();
  }
}
