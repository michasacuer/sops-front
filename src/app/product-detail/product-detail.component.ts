import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Product } from "../models/product";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DataService, ModelState } from "../data.service";
import { FormGenerator } from "../form-generator/form-generator";
import { Observable } from "rxjs";
import { ExistingProduct } from '../models/existing-product';
import { ErrorService } from '../error.service';
import { MatSnackBar } from '@angular/material';

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
    private location: Location,
    private snackbar: MatSnackBar
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
    let existingProductsBackup = Object.assign({}, this.product.existingProducts);

    let editedProduct: Product = new Product();

    editedProduct.id = this.product.id;
    editedProduct.name = this.product.name;
    editedProduct.barcode = this.product.barcode;
    editedProduct.description = this.product.description;
    editedProduct.companyId = this.product.companyId;
    editedProduct.countryOfOrigin = this.product.countryOfOrigin;
    editedProduct.creationDate = this.product.creationDate;
    editedProduct.defaultExpirationDateInMonths = this.product.defaultExpirationDateInMonths;
    editedProduct.suggestedPrice = this.product.suggestedPrice;

    editedProduct.existingProducts = null;

    this.dataService.putObject(editedProduct).subscribe((response) => {
      console.log(response.errorMessage);
      if (response.errorMessage === null)
      {
        this.modelState.update(response.modelState);
        Object.assign(this.product, response.object as Product);
        Object.assign(this.product.existingProducts, existingProductsBackup);

        this.snackbar.open('product details changed', null, {
          duration: 3000,
          panelClass: ['my-snackbar']
        });
      }
      else
      {
        this.errorService.showError(response);
        console.log(JSON.stringify(response.modelState));
      }
      /* this.goBack(); */
    });
  }

  onAddNewExistingProductClick()
  {
    this.dataService.postObjectByUrl(ExistingProduct, `api/ExistingProduct/${this.product.id}`).subscribe(result => {
      if (result.errorMessage === null)
      {
        this.product.existingProducts.push(result.object);

        this.snackbar.open('added new existing product', null, {
          duration: 3000,
          panelClass: ['my-snackbar']
        });
      }
      else
      {
        this.errorService.showError(result);
      }
    });
  }

  onDeleteProductClick()
  {
    this.dataService.deleteObjectByUrl(this.product, `${this.product.id}`).subscribe(result => {
      if (result.errorMessage === null)
      {
        // console.log('onAddNewExistingProductClick');
        this.productOrderedToDelete.emit(this.product);
      }
      else
      {
        this.errorService.showError(result);
      }
    });
  }
}
