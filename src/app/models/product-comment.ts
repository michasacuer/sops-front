import { ProfileDetails } from "./profile-details";

export class ProductComment {
  id: number;
  productId: number;
  comment: string;
  date: Date;
  applicationUserId: string;
  user: ProfileDetails;
}
