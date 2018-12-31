import { Component, OnInit, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { DataService } from "../data.service";

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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.dataService.getObjects(Product).subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  delete(product: Product): void {
    this.products = this.products.filter(c => c !== product);
    this.dataService.deleteObject(Product).subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    /*this.dataService.addCompany({name} as Product)
      .subscribe(product => {
        this.companies.push(product);
      });*/
  }

  onProductAddClick(): void {
    this.submitEmitter.emit();
    this.dataService
      .addObject(this.newProduct)
      .subscribe(() => this.getProducts());
  }
}
