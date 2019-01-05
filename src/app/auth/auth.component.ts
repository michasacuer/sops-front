import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { UserInfo } from "../models/user-info";
import { UserCredentials } from "../models/user-credentials";
import { MatDialog } from "@angular/material";
import { AuthLoginDialogComponent } from "../auth-login-dialog/auth-login-dialog.component";
import { EventEmitter } from "protractor";
import { AuthRegisterDialogComponent } from "../auth-register-dialog/auth-register-dialog.component";
import { clippyRef } from "../../assets/clippy/clippy-ref";
import { ErrorService } from "../error.service";
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  public userInfo: UserInfo;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public errorService: ErrorService
  ) {}

  ngOnInit() {
    this.auth.userInfo.subscribe(response => {
      // this.errorService.showError(response);
      this.userInfo = response.object;
    });
  }

  onLoginClick() {
    const dialogRef = this.dialog.open(AuthLoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.auth.signIn(result);
      }
    });
  }

  onRegisterClick() {
    const dialogRef = this.dialog.open(AuthRegisterDialogComponent);

    dialogRef.componentInstance.registerEmitter.subscribe(() => {
      this.auth.register(dialogRef.componentInstance.userRegister).subscribe(
        response => {
          if (response.status === 200) {
            dialogRef.close();
            clippyRef.stop();
            clippyRef.speak(`Witam w serwisie przyjacielu.`);
          }
        },
        error => {
          clippyRef.stop();
          clippyRef.speak(
            `Taki użytkownik już istnieje, albo coś takiego.      Tak, teraz mówię po polsku.`
          );
        }
      );
    });
  }

  onProfileClick() {
    let dialogRef = this.dialog.open(ProfileComponent, {
      position: {
        top: '64px',
        right: '135.38px',
      },
      data: {
        userInfo: this.userInfo
      }
    });
/*     dialogRef.componentInstance.profileChangeEmitter.subscribe(updatedUserInfo => {
      this.userInfo = Object.assign({}, updatedUserInfo);
    }); */
  }

  onLogoutClick() {
    console.log(this.auth.currentUserId);
    this.auth.signOut();
  }
}
