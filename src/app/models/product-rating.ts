import { displayName } from "../model-decorators/display-decorators";

export class ProductRating {
  @displayName("UserId")
  userId: string;
  @displayName("ProductId")
  productId: number;
  @displayName("Rating")
  rating: any;
  @displayName("Added")
  added: Date;
}
