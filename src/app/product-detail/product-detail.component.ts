import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Product } from "../models/product";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DataService, ModelState } from "../data.service";
import { FormGenerator } from "../form-generator/form-generator";
import { Observable } from "rxjs";
import { ExistingProduct } from '../models/existing-product';
import { ErrorService } from '../error.service';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  @Input()
  product: Product;
  @Output()
  productOrderedToDelete = new EventEmitter<Product>();

  public submitEmitter = new EventEmitter();
  public modelState = new ModelState();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private errorService: ErrorService,
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
    console.log('go back: ' + JSON.stringify(this.product));
  }

  onAcceptChangedClick(): void
  {
    this.submitEmitter.emit();
    this.dataService.putObject(this.product).subscribe((response) => {
      console.log(response.errorMessage);
      if (response.errorMessage === null)
      {
        this.modelState.update(response.modelState);
        Object.assign(this.product, response.object as Product);
      }
      else
      {
        this.errorService.showError(response);
      }
      /* this.goBack(); */
    });
  }

  onAddNewExistingProductClick()
  {
    console.log('onAddNewExistingProductClick');
    this.productOrderedToDelete.emit(this.product);
    /* this.dataService.postObjectByUrl(ExistingProduct, `api/ExistingProduct/${this.product.id}`).subscribe(result => {
      if (result.errorMessage === null)
      {
        this.productOrderedToDelete.emit(this.product);
      }
      else
      {
        this.errorService.showError (result);
      }
    }); */
  }

  onDeleteProductClick()
  {
    this.dataService.deleteObjectByUrl(this.product, `${this.product.id}`).subscribe(result => {
      if (result.errorMessage === null)
      {
        delete this.product;
      }
      else
      {
        this.errorService.showError(result);
      }
    })
  }
}
