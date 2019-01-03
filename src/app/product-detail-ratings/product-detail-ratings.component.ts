import { Component, OnInit } from "@angular/core";
import { ProductRating } from "../models/product-rating";
import { DataService } from "../data.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../models/product";
import { ErrorService } from "../error.service";
import { ProfileDetails } from "../models/profile-details";

@Component({
  selector: "app-product-detail-ratings",
  templateUrl: "./product-detail-ratings.component.html",
  styleUrls: ["./product-detail-ratings.component.css"]
})
export class ProductDetailRatingsComponent implements OnInit {
  rates: ProductRating[] = [];
  selectedRate: ProductRating = new ProductRating();
  product: Product = new Product();
  userProfiles: ProfileDetails[] = [];
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getProduct();
    this.getUserDetailsAndRates();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    this.dataService.getObject(Product, +id).subscribe(result => {
      this.product = result.object;
    });
  }

  getUserDetailsAndRates(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    this.dataService
      .getObjectsByUrl(ProductRating, `api/ProductRating/${id}`)
      .subscribe(result => {
        this.rates = result.object;
        for (let i = 0; i < this.rates.length; i++) {
          this.dataService
            .getObjectByUrl(
              ProfileDetails,
              `api/User/Profile?id=${this.rates[i].userId}`
            )
            .subscribe(result => {
              this.userProfiles.push(result.object);
            });
        }
      });
  }

  goBack(): void {
    window.history.back();
  }

  onSelect(rate: ProductRating): void {
    this.selectedRate = rate;
  }
}
