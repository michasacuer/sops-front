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
export class ProductPanelUiCommentsComponent implements OnInit {
  @Input() product: Product;
  @Output() productChange = new EventEmitter();

  commentFromInput: string;
  submitEmitter = new EventEmitter();
  modelState = new ModelState();
  newComment: ProductComment = new ProductComment();

  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {}

  submitComment(): void {
    if (this.commentFromInput == null) {
      console.log("string empty");
      return;
    }
    this.newComment.comment = this.commentFromInput;
    /* this.submitEmitter.emit(); */
    this.dataService
      .postObjectByUrl(this.newComment, `api/ProductComment/${this.product.id}`)
      .subscribe(result => {
        if (result.errorMessage === null)
        {
          this.modelState.update(result.modelState);
          this.getComments();
        }
/*         if (result.object || !result.modelState.isOk()) {
          
        } */ 
        else
        {
          this.errorService.showError(result);
        }
      });
  }

  getComments() {
    this.dataService
      .getObjectsByUrl(ProductComment, `api/ProductComment/${this.product.id}`)
      .subscribe(result => {
        this.product.productComments = result.object;
        console.log('to' + JSON.stringify(result.object));

        this.onProductChange();
        console.log('comments lowest result' + result);
      });
  }

  onProductChange()
  {
    console.log('product emit lowest');
    this.productChange.emit(this.product.productComments[this.product.productComments.length - 1]);
  }
}
