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
  private theFirstTime = true;

  constructor(public dialogRef: MatDialogRef<AuthRegisterDialogComponent>) { }

  ngOnInit()
  {
    clippyRef.stop();
    clippyRef.stopCurrent();
    clippyRef.moveTo(290, 355);
    clippyRef.speak('I will assist you during registration');
  }

  onRegisterClick() {
    this.submitEmitter.emit();

    if (this.userRegister.email === null ||
        this.userRegister.password === null ||
        this.userRegister.confirmPassword === null) {

        clippyRef.stop();
        
        if (this.theFirstTime === true) 
        {
           clippyRef.speak(`Look there!        `);
           this.theFirstTime = false; 
        }
        clippyRef.speak(`You forgot to enter some register data      .`);

        
        return;
      }

    else if (this.userRegister.password !== this.userRegister.confirmPassword) {
      clippyRef.stop();
      
      if (this.theFirstTime === true) 
      {
         clippyRef.speak(`Look there!        `);
         this.theFirstTime = false; 
      }
      clippyRef.speak(`Oh no, it seems that Your password does not match confirm password.
                      I will not allow you in unless you correct it`);

      return;
    }
    this.registerEmitter.emit();
  }
}