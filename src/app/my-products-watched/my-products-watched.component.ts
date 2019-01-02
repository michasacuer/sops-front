import { Component, OnInit, Input } from "@angular/core";
import { WatchedProduct } from "../models/watched-product";
import { DataService, ModelState } from "../data.service";
import { Product } from "../models/product";
import { ErrorService } from "../error.service";

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
  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {}
  onSelect(product: Product): void {
    console.log(product);
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
