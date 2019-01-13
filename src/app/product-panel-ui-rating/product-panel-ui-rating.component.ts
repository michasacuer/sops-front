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
export class ProductPanelUiRatingComponent implements OnInit
{
  @Input() 
  averageRating: ProductAvarageRating;
  @Output() 
  selectedRatingSubmitted = new EventEmitter<number>();

  selectedRating: number;

  constructor( ) {}

  ngOnInit() {}

  submitRate(): void 
  {
    if (this.selectedRating == null)
    {
      console.log("rate empty");
      return;
    }
    
    this.selectedRatingSubmitted.emit(this.selectedRating);
  }

  roundNumber(number: number)
  {
    return number.toPrecision(3);
  }
}
