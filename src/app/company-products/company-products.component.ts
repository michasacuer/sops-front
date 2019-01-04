import { Component, OnInit } from "@angular/core";
import { ErrorService } from "../error.service";
import { DataService, ModelState } from "../data.service";
import { Company } from "../models/company";
import { Product } from "../models/product";

@Component({
  selector: "app-company-products",
  templateUrl: "./company-products.component.html",
  styleUrls: ["./company-products.component.css"]
})
export class CompanyProductsComponent implements OnInit {
  companies: Company[];

  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getAllCompanysWithProducts();
  }

  getAllCompanysWithProducts(): void {
    this.dataService
      .getObjectsByUrl(Company, "api/company/products")
      .subscribe(result => {
        this.companies = result.object;
        console.log(result);
      });
  }
}
