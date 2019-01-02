import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompaniesComponent } from "./companies/companies.component";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { ProductsComponent } from "./products/products.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { MyProductsComponent } from "./my-products/my-products.component";
import { ProductDetailRatingsComponent } from "./product-detail-ratings/product-detail-ratings.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "companies", component: CompaniesComponent },
  { path: "companies/detail/:id", component: CompanyDetailComponent },
  { path: "products", component: ProductsComponent },
  { path: "products/detail/:id", component: ProductDetailComponent },
  { path: "myproducts/detail/:id", component: ProductDetailComponent },
  { path: "profile", component: ProfileComponent },
  { path: "myproducts", component: MyProductsComponent },
  { path: "myproducts/ratings/:id", component: ProductDetailRatingsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
