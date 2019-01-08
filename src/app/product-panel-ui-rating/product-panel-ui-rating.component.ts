import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { ProductAvarageRating } from "../models/product-avarage-rating";
import { ProductRating } from "../models/product-rating";
import { DataService, ModelState } from "../data.service";
import { ErrorService } from "../error.service";

@Component({
  selector: "app-product-panel-ui-rating",
  templateUrl: "./product-panel-ui-rating.component.html",
  styleUrls: ["./product-panel-ui-rating.component.css"]
})
export class ProductPanelUiRatingComponent implements OnInit {
  @Input() product: Product;
  @Input() rating: ProductAvarageRating;
  submitEmitter = new EventEmitter();
  modelState = new ModelState();
  value: number;
  newProductRating: ProductRating = new ProductRating();

  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {}

  submitRate(): void {
    console.log(this.value);
    if (this.value == null) {
      console.log("rate empty");
      return;
    }
    this.newProductRating.rating = this.value;
    this.submitEmitter.emit();
    this.dataService
      .postObjectByUrl(
        this.newProductRating,
        `api/ProductRating/${this.product.id}`
      )
      .subscribe(result => {
        if (result.object || !result.modelState.isOk()) {
          this.modelState.update(result.modelState);
          this.getAvarageRating();
        } else {
          this.errorService.showError(result);
        }
      });
  }

  getAvarageRating(): void {
    this.dataService
      .getObjectByUrl(
        ProductAvarageRating,
        `api/ProductRating/Avarage/${this.product.id}`
      )
      .subscribe(result => {
        this.rating = result.object;
      });
  }
}
