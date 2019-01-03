import { Component, OnInit, EventEmitter } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { UserCredentials } from "../models/user-credentials";
import { AuthService } from "../auth.service";
import { DataResponse } from "../data.service";

@Component({
  selector: "app-auth-login-dialog",
  templateUrl: "./auth-login-dialog.component.html",
  styleUrls: ["./auth-login-dialog.component.css"]
})
export class AuthLoginDialogComponent implements OnInit {
  public userCredentials: UserCredentials = new UserCredentials();
  public submitEmitter = new EventEmitter();
  public errorMessage: string;

  constructor(
    public auth: AuthService,
    public dialogRef: MatDialogRef<AuthLoginDialogComponent>
  ) {}

  ngOnInit() {}
  onLoginClick() {
    this.submitEmitter.emit();
    this.auth.signIn(this.userCredentials).subscribe(response => {
      if (response.object) {
        this.dialogRef.close(this.userCredentials);
      } else {
        this.errorMessage = response.errorMessage;
      }
    });
  }
}
