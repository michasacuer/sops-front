import { editable, displayName } from "../model-decorators/display-decorators";

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

  @displayName("SuggestedPrice")
  @editable
  suggestedPrice: number;
}
