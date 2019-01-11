import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DataService } from "../data.service";
import { FormGenerator } from "../form-generator/form-generator";
import { Observable } from "rxjs";
import { ProductAvarageRating } from "../models/product-avarage-rating";
import { UserInfo } from "../models/user-info";
import { ProfileDetails } from "../models/profile-details";
import { ProductComment } from '../models/product-comment';
import { ProductRating } from '../models/product-rating';
import { ErrorService } from '../error.service';

@Component({
  selector: "app-product-panel",
  templateUrl: "./product-panel.component.html",
  styleUrls: ["./product-panel.component.css"]
})
export class ProductPanelComponent implements OnInit 
{
  product: Product = new Product();
  averageRating: ProductAvarageRating = new ProductAvarageRating();
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private errorService: ErrorService
  ) { }

  ngOnInit() 
  {
    this.getProductAndCommentsAndAverageRatng();
    console.log('product-panel: ' + JSON.stringify(this.product));
  }

  getProductAndCommentsAndAverageRatng(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    this.dataService.getObject(Product, +id).subscribe(result => {
      this.product = result.object;
      this.dataService
        .getObjectByUrl(
          ProductAvarageRating,
          `api/ProductRating/Avarage/${this.product.id}`
        )
        .subscribe(result => {
          Object.assign(this.averageRating, result.object);
        });
      for (let i = 0; i < this.product.productComments.length; i++) {
        this.dataService
          .getObjectByUrl(
            ProfileDetails,
            `api/User/Profile?id=${
              this.product.productComments[i].applicationUserId
            }`
          )
          .subscribe(result => {
            this.product.productComments[i].user = result.object;
          });
      }
    });
  }

  onSelectedRatingSubmitted(selectedRating: number)
  {
    const newRating = new ProductRating();
    newRating.rating = selectedRating;

    this.dataService.postObjectByUrl(newRating, `api/ProductRating/${this.product.id}`)
      .subscribe(result => {
      if (result.errorMessage === null)
      {
        this.dataService.getObjectByUrl(ProductAvarageRating,
          `api/ProductRating/Avarage/${this.product.id}`).subscribe(res => {
            if (res.errorMessage === null)
            {
              this.averageRating.avarageRating = res.object.avarageRating; 
            }
            else
            {
              this.errorService.showError(res);
            }
          });
      }
      else
      {
        this.errorService.showError(result);
      }
    });
  }

  onNewCommentSubmitted(newComment: string)
  {
    const newCommendToSend = new ProductComment();
    newCommendToSend.comment = newComment;

    this.dataService.postObjectByUrl(newCommendToSend, `api/ProductComment/${this.product.id}`)
        .subscribe(result => {
        if (result.errorMessage === null)
        {
          this.dataService.getObjectByUrl(ProfileDetails, 
            `api/User/Profile?id=${result.object.applicationUserId}`).subscribe(res => 
              {
                if (res.errorMessage === null)
                {
                  result.object.user = res.object;
                  this.product.productComments.push(result.object); 
                }
                else
                {
                  this.errorService.showError(res);
                }
              });   
        }
        else
        {
          this.errorService.showError(result);
        }
      });
    }
}
