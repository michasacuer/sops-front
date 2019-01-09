import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
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
  @Output() productChange = new EventEmitter<Product>();
  
  @Input() rating: ProductAvarageRating;
  @Output() ratingChange = new EventEmitter<ProductAvarageRating>();

  /* submitEmitter = new EventEmitter(); */
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
    /* this.submitEmitter.emit(); */
    this.dataService
      .postObjectByUrl(
        this.newProductRating,
        `api/ProductRating/${this.product.id}`
      )
      .subscribe(result => {
        if (result.errorMessage === null)
        {
          console.log('rating component: ok');
          this.modelState.update(result.modelState);
          this.getAvarageRating();        
        }
        else
        {
          console.log('rating component: error');
          console.log(`api/ProductRating/${this.product.id}`);
          console.log(result.object);
          console.log(result.errorMessage);
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
        // this.rating = Object.assign({}, ) result.object;
        /* Object.assign(this.rating, result.object); */
        console.log('rating component-average: ok');
        console.log(result.object);
        /* this.newProductRating = result.object.avarageRating; */
        this.ratingChange.emit(result.object);
        /* console.log('rating component'); */
      });
  }
}
