import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { DataService } from "../data.service";
import { ErrorService } from "../error.service";
import { WatchedProduct } from "../models/watched-product";
import { forkJoin } from "rxjs";
import { ProductAvarageRating } from "../models/product-avarage-rating";
import { ProductRating } from "../models/product-rating";
import { ProfileDetails } from "../models/profile-details";

@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.css"]
})
export class MyProductsComponent implements OnInit {
  watched: WatchedProduct[] = [];
  products: Product[] = [];
  watchedProducts: Product[] = [];
  ratings: ProductAvarageRating[] = [];
  userRatings: ProductRating[] = [];
  currentUser: ProfileDetails = new ProfileDetails();
  ratedProducts: Product[] = [];

  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getAllData();
  }

  getAllData(): void {
    forkJoin(
      this.dataService.getObjects(WatchedProduct),
      this.dataService.getObjects(Product),
      this.dataService.getObjectByUrl(ProfileDetails, "api/User/Current")
    ).subscribe(result => {
      this.errorService.showError(result[0]);
      this.watched = result[0].object;
      this.errorService.showError(result[1]);
      this.products = result[1].object;
      this.errorService.showError(result[2]);
      this.currentUser = result[2].object;

      for (let i = 0; i < this.watched.length; i++) {
        for (let j = 0; j < this.products.length; j++) {
          if (this.watched[i].productId == this.products[j].id) {
            this.watchedProducts.push(this.products[j]);
            this.dataService
              .getObjectByUrl(
                ProductAvarageRating,
                `api/ProductRating/Avarage/${this.products[j].id}`
              )
              .subscribe(result => {
                this.ratings.push(result.object);
                this.ratings.sort((a, b) =>
                  a.productId > b.productId
                    ? 1
                    : b.productId > a.productId
                    ? -1
                    : 0
                );
              });
          }
        }
      }

      this.dataService
        .getObjectsByUrl(
          ProductRating,
          `api/ProductRating/Profile?id=${this.currentUser.id}`
        )
        .subscribe(result => {
          this.userRatings = result.object;
          for (let i = 0; i < this.userRatings.length; i++) {
            this.dataService
              .getObject(Product, +this.userRatings[i].productId)
              .subscribe(result => {
                this.ratedProducts.push(result.object);
              });
          }
        });
    });
  }
}
