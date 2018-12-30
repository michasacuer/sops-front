import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserCredentials } from '../models/user-credentials';

@Component({
  selector: 'app-auth-login-dialog',
  templateUrl: './auth-login-dialog.component.html',
  styleUrls: ['./auth-login-dialog.component.css']
})
export class AuthLoginDialogComponent implements OnInit {
  public userCredentials: UserCredentials = new UserCredentials();
  public submitEmitter = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<AuthLoginDialogComponent>) { }

  ngOnInit() {
  }
  onLoginClick() {
    this.submitEmitter.emit();
    this.dialogRef.close(this.userCredentials);
  }

}
