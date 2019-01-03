import { Component, OnInit, Input } from "@angular/core";
import { ProductAvarageRating } from "../models/product-avarage-rating";
import { WatchedProduct } from "../models/watched-product";
import { Product } from "../models/product";

@Component({
  selector: "app-my-products-ratings",
  templateUrl: "./my-products-ratings.component.html",
  styleUrls: ["./my-products-ratings.component.css"]
})
export class MyProductsRatingsComponent implements OnInit {
  @Input() watchedProducts: WatchedProduct[] = [];
  @Input() ratings: ProductAvarageRating[] = [];
  selectedProduct = new Product();
  constructor() {}

  ngOnInit() {
    console.log(this.ratings);
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }
}
