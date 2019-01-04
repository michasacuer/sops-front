import { Component, OnInit, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { DataService, ModelState } from "../data.service";
import { ErrorService } from "../error.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;
  newProduct: Product = new Product();
  submitEmitter = new EventEmitter();
  modelState = new ModelState();

  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.dataService.getObjects(Product).subscribe(result => {
      this.errorService.showError(result);
      this.products = result.object;
      console.log(this.products);
    });
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  delete(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.dataService.deleteObject(product).subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    /*this.dataService.addproduct({name} as Product)
      .subscribe(product => {
        this.products.push(product);
      });*/
  }

  onProductAddClick(): void {
    this.submitEmitter.emit();
    this.dataService.postObject(this.newProduct).subscribe(result => {
      if (result.object || !result.modelState.isOk()) {
        this.modelState.update(result.modelState);
        this.getProducts();
      } else {
        this.errorService.showError(result);
      }
    });
  }
}
