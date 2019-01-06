import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DataService } from "../data.service";
import { FormGenerator } from "../form-generator/form-generator";
import { Observable } from "rxjs";

@Component({
  selector: "app-product-panel",
  templateUrl: "./product-panel.component.html",
  styleUrls: ["./product-panel.component.css"]
})
export class ProductPanelComponent implements OnInit {
  product: Product = new Product();
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    this.dataService.getObject(Product, +id).subscribe(result => {
      this.product = result.object;
    });
  }
}
