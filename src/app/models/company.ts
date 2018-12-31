import { editable, displayName } from '../model-decorators/display-decorators';

export class Company {
  id: number;

  @displayName('Name')
  @editable
  name: string;

  // @displayName('Kind')
  // @editable
  kind: string;

  @displayName('Address street')
  @editable
  addressStreet: string;

  @displayName('Address ZIP code')
  @editable
  addressZipCode: string;

  @displayName('Address city')
  @editable
  addressCity: string;

  @displayName('E-mail')
  @editable
  email: string;

  @displayName('NIP')
  @editable
  nip: string;

  @displayName('REGON')
  @editable
  regon: string;
}
