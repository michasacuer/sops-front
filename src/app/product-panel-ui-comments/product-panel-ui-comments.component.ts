import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Product } from "../models/product";
import { DataService, ModelState } from "../data.service";
import { ErrorService } from "../error.service";
import { ProductComment } from "../models/product-comment";

@Component({
  selector: "app-product-panel-ui-comments",
  templateUrl: "./product-panel-ui-comments.component.html",
  styleUrls: ["./product-panel-ui-comments.component.css"]
})
export class ProductPanelUiCommentsComponent implements OnInit 
{
  @Input()
  productComments: Array<ProductComment>;
  @Output()
  newCommentSubmitted = new EventEmitter<string>();

  newComment: string = '';

  constructor() {}

  ngOnInit() {}

  submitComment(): void 
  {
    if (this.newComment == null) 
    {
      console.log("string empty");
      return;
    }

    this.newCommentSubmitted.emit(this.newComment);
  }
}
