import { displayName } from "../model-decorators/display-decorators";

export class WatchedProduct {
  @displayName("UserId")
  applicationUserId: string;

  @displayName("ProductId")
  productId: number;
}
