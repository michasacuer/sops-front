import { displayName } from "../model-decorators/display-decorators";

export class Statistic {
  @displayName("AllCompanies")
  companiesCount: number;

  @displayName("AllProductsCount")
  allProductsCount: number;
}
