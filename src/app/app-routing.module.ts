import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompaniesComponent } from "./companies/companies.component";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { ProductsComponent } from "./products/products.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "companies", component: CompaniesComponent },
  { path: "companies/detail/:id", component: CompanyDetailComponent },
  { path: "products", component: ProductsComponent },
  { path: "products/detail/:id", component: ProductDetailComponent },
  { path: "profile", component: ProfileComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
