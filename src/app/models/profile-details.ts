import { editable, displayName } from "../model-decorators/display-decorators";

export class ProfileDetails {
  id: string;

  @displayName("UserName")
  @editable
  userName: string;

  @displayName("Name")
  @editable
  name: string;

  @displayName("Surname")
  @editable
  suername: string;

  @displayName("PhoneNumber")
  @editable
  phoneNumber: number;

  @displayName("Email")
  @editable
  email: string;
}
