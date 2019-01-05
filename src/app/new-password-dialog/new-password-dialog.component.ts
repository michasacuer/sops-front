import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarConfig, MatDialogRef} from '@angular/material';
import { DataService } from '../data.service';
import { ChangePassword } from '../models/change-password';

@Component({
  selector: 'app-new-password-dialog',
  templateUrl: './new-password-dialog.component.html',
  styleUrls: ['./new-password-dialog.component.css']
})
export class NewPasswordDialogComponent implements OnInit
{
  private changePassword = new ChangePassword();

  constructor(
    public dialogRef: MatDialogRef<NewPasswordDialogComponent>,
    private dataService: DataService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onOkClick()
  {
    if (this.changePassword.newPassword === this.changePassword.confirmPassword)
    {
      this.dataService.postObjectByUrl(this.changePassword, 'api/Account/ChangePassword').subscribe(result => {
        console.log(result);
      });
      this.snackbar.open('hasło zostało zmienione - chyba ;)');
      this.dialogRef.close();
    }
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
