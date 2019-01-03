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
  @Input() userRatings: ProductRating[] = [];
  @Input() ratedProducts: Product[] = [];
  constructor() {}

  ngOnInit() {}
}
