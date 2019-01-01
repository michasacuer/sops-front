import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserRegister } from '../models/user-register';
import { clippyRef } from '../../assets/clippy/clippy-ref'

@Component({
  selector: 'app-auth-register-dialog',
  templateUrl: './auth-register-dialog.component.html',
  styleUrls: ['./auth-register-dialog.component.css']
})
export class AuthRegisterDialogComponent implements OnInit {
  public userRegister: UserRegister = new UserRegister();
  public submitEmitter = new EventEmitter();
  public registerEmitter = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<AuthRegisterDialogComponent>) { }

  ngOnInit() {
  }

  onRegisterClick() {
    this.submitEmitter.emit();

    if (this.userRegister.email === null ||
        this.userRegister.password === null ||
        this.userRegister.confirmPassword === null) {
        clippyRef.stop();
        clippyRef.speak(`Look there!        `);
        clippyRef.speak(`You forgot to enter some register data      .`);

        return;
      }

    else if (this.userRegister.password !== this.userRegister.confirmPassword) {
      clippyRef.stop();
      clippyRef.speak(`Look there!        `);
      clippyRef.speak(`Oh no, bloody hell! Your password does not match confirm password.
                      I will not allow you in unless you correct it`);

      return;
    }
    this.registerEmitter.emit();
  }
}