import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";
@Component({
  selector: "app-product-panel-ui-comments",
  templateUrl: "./product-panel-ui-comments.component.html",
  styleUrls: ["./product-panel-ui-comments.component.css"]
})
export class ProductPanelUiCommentsComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit() {}
}
