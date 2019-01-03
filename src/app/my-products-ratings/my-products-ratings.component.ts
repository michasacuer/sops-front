import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";
import { ProductRating } from "../models/product-rating";
import { DataService } from "../data.service";
import { ErrorService } from "../error.service";

@Component({
  selector: "app-my-products-ratings",
  templateUrl: "./my-products-ratings.component.html",
  styleUrls: ["./my-products-ratings.component.css"]
})
export class MyProductsRatingsComponent implements OnInit {
  selectedProductRating: ProductRating = new ProductRating();
  @Input() userRatings: ProductRating[] = [];
  @Input() ratedProducts: Product[] = [];
  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {}

  onSelect(productRating: ProductRating): void {
    this.selectedProductRating = productRating;
  }

  delete(productRating: ProductRating): void {
    this.userRatings = this.userRatings.filter(r => r !== productRating);
    this.dataService
      .deleteObjectByUrl(
        productRating,
        `${productRating.userId}/${productRating.productId}`
      )
      .subscribe();
  }
}
