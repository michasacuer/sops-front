import { editable, password } from '../model-decorators/display-decorators';

export class UserCredentials {
  @editable
  email: string;

  @editable
  @password
  password: string;
}
