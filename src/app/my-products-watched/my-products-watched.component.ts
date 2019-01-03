import { Component, OnInit, Input } from "@angular/core";
import { WatchedProduct } from "../models/watched-product";
import { DataService, ModelState } from "../data.service";
import { Product } from "../models/product";
import { ErrorService } from "../error.service";
import { ProductAvarageRating } from "../models/product-avarage-rating";
@Component({
  selector: "app-my-products-watched",
  templateUrl: "./my-products-watched.component.html",
  styleUrls: ["./my-products-watched.component.css"]
})
export class MyProductsWatchedComponent implements OnInit {
  products: Product[] = [];
  watched: WatchedProduct[] = [];
  selectedProduct = new Product();
  @Input() watchedProducts: WatchedProduct[] = [];
  @Input() ratings: ProductAvarageRating[] = [];

  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    console.log(this.ratings);
  }
  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  delete(product: WatchedProduct): void {
    this.dataService.deleteObject(product).subscribe(response => {
      if (response.object) {
        this.watched = this.watched.filter(c => c !== product);
      } else {
        this.errorService.showError(response);
      }
    });
  }
}
