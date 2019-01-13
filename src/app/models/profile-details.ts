import { editable, displayName } from '../model-decorators/display-decorators';
import { Company } from './company';

export class ProfileDetails {
  id: string;

  @displayName('User name')
  @editable
  userName: string;

  @displayName('Name')
  @editable
  name: string;

  @displayName('Surname')
  @editable
  surname: string;

  @displayName('Phone')
  @editable
  phoneNumber: number;

  @displayName('E-mail')
  @editable
  email: string;

  @displayName('Is employee')
  @editable
  isEmployee: boolean;

  @displayName('Company')
  @editable
  company: Company;
}
