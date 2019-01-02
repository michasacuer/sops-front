import { editable, password, displayName } from '../model-decorators/display-decorators';

export class UserRegister {
  @displayName('Email address')
  @editable
  email: string;

  @displayName('Password')
  @editable
  @password
  password: string;

  @displayName('Confirm password')
  @editable
  @password
  confirmPassword: string;
}
