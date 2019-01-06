import { editable, displayName } from "../model-decorators/display-decorators";
import { ProductRating } from "./product-rating";
import { ProductComment } from "./product-comment";

export class Product {
  id: number;

  @displayName("Name")
  @editable
  name: string;

  @displayName("Barcode")
  @editable
  barcode: string;

  @displayName("Description")
  @editable
  description: string;

  @displayName("CompanyId")
  @editable
  companyId: number;

  @displayName("ContryOfOrigin")
  @editable
  countryOfOrigin: string;

  @displayName("CreationDate")
  @editable
  creationDate: Date;

  @displayName("DefaultExpirationDateInMonths")
  @editable
  defaultExpirationDateInMonths: number;

  @displayName("SuggestedPrice")
  @editable
  suggestedPrice: any;

  productRatings: ProductRating[];
  productComments: ProductComment[];
}
