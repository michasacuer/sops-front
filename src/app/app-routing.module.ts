import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductDetailRatingsComponent } from './product-detail-ratings/product-detail-ratings.component';
import { EmployeeCompanyComponent } from './employee-company/employee-company.component';
import { CompanyProductsComponent } from './company-products/company-products.component';
import { ProductPanelComponent } from './product-panel/product-panel.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/companies', component: CompaniesComponent },
  { path: 'admin/companies/detail/:id', component: CompanyDetailComponent },
  { path: 'admin/products', component: ProductsComponent },
  { path: 'admin/products/detail/:id', component: ProductDetailComponent },
  { path: 'admin/myproducts/detail/:id', component: ProductDetailComponent },
  { path: 'companies', component: EmployeeCompanyComponent },
  { path: 'companies/product/detail/:id', component: ProductDetailComponent },
  { path: 'products', component: CompanyProductsComponent },
  { path: 'products/detail/:id', component: ProductDetailComponent },
  { path: 'myproducts/detail/:id', component: ProductDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'myproducts', component: MyProductsComponent },
  { path: 'myproducts/ratings/:id', component: ProductDetailRatingsComponent },
  { path: 'products/panel/:id', component: ProductPanelComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
