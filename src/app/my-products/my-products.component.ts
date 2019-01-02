import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { DataService, ModelState } from "../data.service";
import { ErrorService } from "../error.service";
import { WatchedProduct } from "../models/watched-product";

@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.css"]
})
export class MyProductsComponent implements OnInit {
  watched: WatchedProduct[] = [];
  products: Product[] = [];
  watchedProducts: Product[] = [];
  selectedProduct = new Product();
  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getWatchedProducts();
  }

  getWatchedProducts(): void {
    this.dataService.getObjects(WatchedProduct).subscribe(result => {
      this.errorService.showError(result);
      console.log(result);
      this.watched = result.object;
    });
    this.dataService.getObjects(Product).subscribe(result => {
      this.errorService.showError(result);
      console.log(result);
      this.products = result.object;
      for (let i = 0; i < this.watched.length; i++) {
        for (let j = 0; j < this.products.length; j++) {
          if (this.watched[i].productId == this.products[j].id)
            this.watchedProducts.push(this.products[j]);
        }
      }
      console.log("produkciki" + this.watchedProducts);
    });
  }

  onSelect(product: Product): void {
    console.log(product);
    this.selectedProduct = product;
  }
}
