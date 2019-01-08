import { Component, OnInit, Input, EventEmitter } from "@angular/core";
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
    this.submitEmitter.emit();
    this.dataService
      .postObjectByUrl(this.newComment, `api/ProductComment/${this.product.id}`)
      .subscribe(result => {
        if (result.object || !result.modelState.isOk()) {
          this.modelState.update(result.modelState);
          this.getComments();
        } else {
          this.errorService.showError(result);
        }
      });
  }

  getComments() {
    this.dataService
      .getObjectsByUrl(ProductComment, `api/ProductComment/${this.product.id}`)
      .subscribe(result => {
        this.product.productComments = result.object;
        console.log(result);
      });
  }
}
