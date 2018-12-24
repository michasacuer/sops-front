import { editable, displayName } from '../model-decorators/display-decorators';

export class Company {
  id: number;

  @displayName('Name')
  @editable
  name: string;

  // @displayName('Kind')
  // @editable
  kind: string;

  @displayName('AddressStreet')
  @editable
  addressStreet: string;

  @displayName('AddressZipCode')
  @editable
  addressZipCode: string;

  @displayName('AddressCity')
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
