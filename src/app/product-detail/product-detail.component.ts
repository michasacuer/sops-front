import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DataService } from "../data.service";
import { FormGenerator } from "../form-generator/form-generator";
import { Observable } from "rxjs";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  @Input()
  product: Product;
  
  public submitEmitter = new EventEmitter();
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit() {
    // this.getProduct();
  }

  getProduct(): void {
/*     const id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    this.dataService.getObject(Product, +id).subscribe(result => {
      this.product = result.object;
    }); */
  }

  goBack(): void {
    // window.history.back();
    console.log('go back: ' + JSON.stringify( this.product));
  }

  save(): void {
    this.submitEmitter.emit();
    this.dataService.putObject(this.product).subscribe(() => this.goBack());
  }
}
