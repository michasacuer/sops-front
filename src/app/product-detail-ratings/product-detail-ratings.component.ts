import { Component, OnInit } from "@angular/core";
import { ProductRating } from "../models/product-rating";
import { DataService } from "../data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-detail-ratings",
  templateUrl: "./product-detail-ratings.component.html",
  styleUrls: ["./product-detail-ratings.component.css"]
})
export class ProductDetailRatingsComponent implements OnInit {
  rates: ProductRating[] = [];
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getRates();
    console.log("rejty" + this.rates);
  }

  getRates() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    this.dataService
      .getObjectsByUrl(ProductRating, `api/ProductRating/${id}`)
      .subscribe(result => {
        this.rates = result.object;
      });
  }
}
