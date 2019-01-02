import { Component, OnInit } from "@angular/core";
import { ProductAvarageRating } from "../models/product-avarage-rating";

@Component({
  selector: "app-my-products-ratings",
  templateUrl: "./my-products-ratings.component.html",
  styleUrls: ["./my-products-ratings.component.css"]
})
export class MyProductsRatingsComponent implements OnInit {
  ratings: ProductAvarageRating[] = [];
  constructor() {}

  ngOnInit() {}
}
