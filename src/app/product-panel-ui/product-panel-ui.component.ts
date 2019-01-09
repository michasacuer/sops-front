import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { ProductAvarageRating } from "../models/product-avarage-rating";

@Component({
  selector: "app-product-panel-ui",
  templateUrl: "./product-panel-ui.component.html",
  styleUrls: ["./product-panel-ui.component.css"]
})
export class ProductPanelUiComponent implements OnInit {
  @Input() product: Product;
  @Output() productChange = new EventEmitter<Product>();

  @Input() rating: ProductAvarageRating;
  @Output() ratingChange = new EventEmitter();

  onRatingChange(newRating)
  {
    this.ratingChange.emit(newRating);
  }

  onProductChange(newComment)
  {
    this.productChange.emit(newComment);
  }

  constructor() {}

  ngOnInit() {}
}
