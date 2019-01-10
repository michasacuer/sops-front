import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { ProductAvarageRating } from "../models/product-avarage-rating";
import { ProductComment } from '../models/product-comment';

@Component({
  selector: "app-product-panel-ui",
  templateUrl: "./product-panel-ui.component.html",
  styleUrls: ["./product-panel-ui.component.css"]
})
export class ProductPanelUiComponent implements OnInit {
  @Input()
  productComments: Array<ProductComment>;
  @Output()
  newCommentSubmitted = new EventEmitter<string>();

  @Input()
  averageRating: ProductAvarageRating;
  @Output()
  selectedRatingSubmitted = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onSelectedRatingSubmitted(selectedRating: number)
  {
    this.selectedRatingSubmitted.emit(selectedRating);
  }

  onNewCommentSubmitted(newComment: string)
  {
    this.newCommentSubmitted.emit(newComment);
  }
}
