import { Component, OnInit, Input } from "@angular/core";
import { Company } from "../models/company";
import { Product } from "../models/product";

@Component({
  selector: "app-company-products",
  templateUrl: "./company-products.component.html",
  styleUrls: ["./company-products.component.css"]
})
export class CompanyProductsComponent implements OnInit {
  companyProducts: Product[] = [];
  @Input() company: Company;
  constructor() {}

  ngOnInit() {}
}
