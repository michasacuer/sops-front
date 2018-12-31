import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompaniesComponent } from "./companies/companies.component";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [
  { path: "", redirectTo: "/companies", pathMatch: "full" },
  { path: "companies", component: CompaniesComponent },
  { path: "detail/:id", component: CompanyDetailComponent },
  { path: "products", component: ProductsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
