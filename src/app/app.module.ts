import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CompaniesComponent } from "./companies/companies.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormComponent } from "./form/form.component";
import { AuthHttpInterceptor } from "./authentication/auth-http-interceptor";
import { AuthComponent } from "./auth/auth.component";
import { CookieService } from "ngx-cookie-service";
import { HomeComponent } from "./home/home.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatBadgeModule,
  MatTabsModule,
  MatGridListModule
} from "@angular/material";
import { AuthLoginDialogComponent } from "./auth-login-dialog/auth-login-dialog.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductsComponent } from "./products/products.component";
import { StatisticComponent } from "./statistic/statistic.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileDetailsComponent } from "./profile-details/profile-details.component";
import { AuthRegisterDialogComponent } from "./auth-register-dialog/auth-register-dialog.component";
import { ErrorComponent as ErrorDialogComponent } from "./error-dialog/error.component";
import { MyProductsComponent } from "./my-products/my-products.component";
import { SearchPipe } from "./pipes/search.pipe";
import { MyProductsWatchedComponent } from "./my-products-watched/my-products-watched.component";
import { StarRatingModule } from "angular-star-rating";
import { MyProductsRatingsComponent } from "./my-products-ratings/my-products-ratings.component";
import { NewsComponent } from "./news/news.component";
import { ProductDetailRatingsComponent } from "./product-detail-ratings/product-detail-ratings.component";
import { EmployeeCompanyComponent } from './employee-company/employee-company.component';
import { EmployeeCompanyProductsComponent } from './employee-company-products/employee-company-products.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    FormComponent,
    AuthComponent,
    HomeComponent,
    AuthLoginDialogComponent,
    ProductsComponent,
    StatisticComponent,
    ProductDetailComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    AuthRegisterDialogComponent,
    ErrorDialogComponent,
    MyProductsComponent,
    SearchPipe,
    MyProductsWatchedComponent,
    MyProductsRatingsComponent,
    NewsComponent,
    ProductDetailRatingsComponent,
    EmployeeCompanyComponent,
    EmployeeCompanyProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatTabsModule,
    MatGridListModule,
    StarRatingModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    CookieService
  ],
  entryComponents: [
    AuthLoginDialogComponent,
    AuthRegisterDialogComponent,
    ErrorDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
