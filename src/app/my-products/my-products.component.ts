import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { DataService, ModelState } from "../data.service";
import { ErrorService } from "../error.service";
import { WatchedProduct } from "../models/watched-product";
import { forkJoin } from "rxjs";
import { ProductAvarageRating } from "../models/product-avarage-rating";

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

  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getWatchedProducts();
    console.log(this.watchedProducts);
  }
  getWatchedProducts(): void {
    forkJoin(
      this.dataService.getObjects(WatchedProduct),
      this.dataService.getObjects(Product)
    ).subscribe(result => {
      this.errorService.showError(result[0]);
      this.watched = result[0].object;

      this.errorService.showError(result[1]);
      this.products = result[1].object;
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
              });
          }
        }
      }
    });
  }
}
