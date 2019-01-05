import { editable, displayName } from "../model-decorators/display-decorators";

export class UserInfo {
  id: string;
  name: string;
  suername: string;
  phoneNumber: number;
  email: string;
  role: string;
  companyId: number;
  hasRegistered: string;
  loginProvider: string;
}
