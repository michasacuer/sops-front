import { editable, password } from '../model-decorators/display-decorators';

export class UserRegister {
  @editable
  email: string;

  @editable
  @password
  password: string;

  @editable
  @password
  confirmPassword: string;
}
