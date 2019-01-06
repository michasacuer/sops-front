import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";
import { ProductAvarageRating } from "../models/product-avarage-rating";

@Component({
  selector: "app-product-panel-ui",
  templateUrl: "./product-panel-ui.component.html",
  styleUrls: ["./product-panel-ui.component.css"]
})
export class ProductPanelUiComponent implements OnInit {
  @Input() product: Product;
  @Input() rating: ProductAvarageRating;

  constructor() {}

  ngOnInit() {}
}
