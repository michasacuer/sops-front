import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterDialogComponent } from './auth-register-dialog.component';

describe('AuthRegisterDialogComponent', () => {
  let component: AuthRegisterDialogComponent;
  let fixture: ComponentFixture<AuthRegisterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRegisterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
