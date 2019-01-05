import {Component, OnInit, Inject, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarConfig, MatDialogRef} from '@angular/material';
import { UserInfo } from '../models/user-info';
import { Company } from '../models/company';
import { DataService } from '../data.service';
import { CompaniesComponent } from '../companies/companies.component';
import { NewPasswordDialogComponent } from '../new-password-dialog/new-password-dialog.component';
import { AuthService } from '../auth.service';
import { ChangeRole } from '../models/change-role';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
{
  private userInfo: UserInfo;
  private userEmail: string;
  private userName: string;
  private userSurname: string;
  private userCompany: Company;
  /* public profileChangeEmitter = new EventEmitter(); */

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              private dialogRef: MatDialogRef<ProfileComponent>,
              private dialog: MatDialog,
              private dataService: DataService,
              private authService: AuthService, 
              private newPasswordDialog: MatDialog,
              private snackbar: MatSnackBar)
  {
  }

  ngOnInit()
  {
    this.userInfo = Object.assign({}, this.data.userInfo);
    this.dataService.getObjectByUrl(Company, 'api/Company/' + this.userInfo.companyId).subscribe(result => {
      this.userCompany = result.object;
    });
  }

  sendUpdateUserRequest()
  {
    this.dataService.putObjectByUrl(this.userInfo, 'api/User/Profile').subscribe(response => {
      if (response.errorMessage === null)
      {
        /* this.profileChangeEmitter.emit(this.userInfo); */
        console.log(this.userInfo);
        this.authService.loadUserInfo();
        this.snackbar.open('zmiana zaakceptowana', null, {
          duration: 3000,
          panelClass: ['my-snackbar']
        });
      }
      else
      {
        this.snackbar.open('coś nie tak', null, {
          duration: 3000,
          panelClass: ['my-snackbar']
        });
      }
    });
  }

  onChangeUserEmailClick()
  {
    this.userInfo.email = this.userEmail;
    this.sendUpdateUserRequest();
  }

  onChangeUserNameClick()
  {
    this.userInfo.name = this.userName;
    this.sendUpdateUserRequest();
  }

  onChangeUserSurnameClick()
  {
    this.userInfo.surname = this.userSurname;
    this.sendUpdateUserRequest();
  }

  onEmailKeyup(newEmail: any)
  {
    this.userEmail = newEmail;
  }

  onNameKeyup(newName: any)
  {
    this.userName = newName;
  }

  onSurnameKeyup(newSurname: any)
  {
    this.userSurname = newSurname;
  }

  onNewPasswordClick()
  {
    const dialogRef = this.newPasswordDialog.open(NewPasswordDialogComponent);
  }

  onDeleteAccountClick()
  {
    const deleteAccountDialogRef = this.dialog.open(DeleteAccountDialogComponent);
    /* this.dataService.deleteObjectByFullUrl('api/Account').subscribe(result => {
      console.log(result);
      if (result.errorMessage === null)
      {
        this.authService.signOut();
        this.dialogRef.close();
      }
    }); */
  }

  onLeaveClick()
  {
    const newRole = new ChangeRole();
    newRole.userId = this.userInfo.id;
    newRole.role = "User";
    newRole.optionalCompanyId = 0;

    console.log('hello');
    this.dataService.postObjectByUrl(newRole, 'api/Role/').subscribe(result => {
      if (result.errorMessage === null)
      {
        this.snackbar.open('papa firmo', null, {
          duration: 3000,
          panelClass: ['my-snackbar']
        }); 
        this.authService.signOut();
        this.dialogRef.close();
      }
    });
  }

  onDeleteRequestClick()
  {
    this.snackbar.open('wysłano żądanie usunięcia (żartowałem)', null, {
      duration: 3000,
      panelClass: ['my-snackbar']
    }); 
  }
}
