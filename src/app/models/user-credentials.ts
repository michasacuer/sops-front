import { editable } from '../model-decorators/display-decorators';

export class UserCredentials {
  @editable
  email: string;

  @editable
  password: string;
}
