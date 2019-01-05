import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarConfig, MatDialogRef} from '@angular/material';
import { DataService } from '../data.service';
import { ChangePassword } from '../models/change-password';
import { AuthService } from '../auth.service';
import { UserCredentials } from '../models/user-credentials';

@Component({
  selector: 'app-new-password-dialog',
  templateUrl: './new-password-dialog.component.html',
  styleUrls: ['./new-password-dialog.component.css']
})
export class NewPasswordDialogComponent implements OnInit
{
  private changePassword = new ChangePassword();
  private snackbarConfig;

  constructor(
    public dialogRef: MatDialogRef<NewPasswordDialogComponent>,
    private dataService: DataService,
    private authService: AuthService,
    private snackbar: MatSnackBar) { }

  ngOnInit()
  {
    this.snackbarConfig = {
      duration: 3000,
      panelClass: ['my-snackbar']
    }; 
  }

  onOkClick()
  {
    if (this.changePassword.oldPassword === undefined ||
        this.changePassword.newPassword === undefined ||
        this.changePassword.confirmPassword === undefined)
    {
      this.snackbar.open('empty fields not allowed', null, this.snackbarConfig);
      return;
    }

    if (this.changePassword.newPassword !== this.changePassword.confirmPassword)
    {
      this.snackbar.open('new password does not match confirm password', null, this.snackbarConfig);
      return;
    }

    const userCredentials = new UserCredentials();
    userCredentials.email = this.authService.currentUserEmail;
    userCredentials.password = this.changePassword.oldPassword;

    /* console.log(userCredentials); */

    this.dataService.postObjectByUrl(this.changePassword, 'api/Account/ChangePassword').subscribe(result => {
      if (result.errorMessage === null)
      {
        this.snackbar.open('hasło zostało zmienione - chyba ;)', null, this.snackbarConfig);
        this.dialogRef.close();
        return;
      }
      else
      {
        this.snackbar.open('something went wrong', null, this.snackbarConfig);
        return;
      }
    });
  }

  onOldPasswordKeyup(newOldPassword: any)
  {
    this.changePassword.oldPassword = newOldPassword;
  }

  onPasswordKeyup(newPassword: any)
  {
    this.changePassword.newPassword = newPassword;
  }

  onConfirmPasswordKeyup(newConfirmPassword: any)
  {
    this.changePassword.confirmPassword = newConfirmPassword;
  }
}
