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
  MatGridListModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSelectModule
} from "@angular/material";
import { MatExpansionModule } from "@angular/material/expansion";
import { AuthLoginDialogComponent } from "./auth-login-dialog/auth-login-dialog.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductsComponent } from "./products/products.component";
import { StatisticComponent } from "./statistic/statistic.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthRegisterDialogComponent } from "./auth-register-dialog/auth-register-dialog.component";
import { ErrorComponent as ErrorDialogComponent } from "./error-dialog/error.component";
import { MyProductsComponent } from "./my-products/my-products.component";
import { SearchPipe } from "./pipes/search.pipe";
import { MyProductsWatchedComponent } from "./my-products-watched/my-products-watched.component";
import { StarRatingModule } from "angular-star-rating";
import { MyProductsRatingsComponent } from "./my-products-ratings/my-products-ratings.component";
import { NewsComponent } from "./news/news.component";
import { ProductDetailRatingsComponent } from "./product-detail-ratings/product-detail-ratings.component";
import { EmployeeCompanyComponent } from "./employee-company/employee-company.component";
import { NewPasswordDialogComponent } from "./new-password-dialog/new-password-dialog.component";
import { CompanyProductsComponent } from "./company-products/company-products.component";
import { DeleteAccountDialogComponent } from "./delete-account-dialog/delete-account-dialog.component";
import { ProductPanelComponent } from "./product-panel/product-panel.component";
import { ProductPanelUiComponent } from "./product-panel-ui/product-panel-ui.component";
import { ProductPanelUiCommentsComponent } from "./product-panel-ui-comments/product-panel-ui-comments.component";
import { ProductPanelUiRatingComponent } from "./product-panel-ui-rating/product-panel-ui-rating.component";
import { WatchedProductStarComponent } from './watched-product-star/watched-product-star.component';
import { QrDialogComponent } from './qr-dialog/qr-dialog.component';
import { AddExistingProductIconComponent } from './add-existing-product-icon/add-existing-product-icon.component';

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
    AuthRegisterDialogComponent,
    ErrorDialogComponent,
    MyProductsComponent,
    SearchPipe,
    MyProductsWatchedComponent,
    MyProductsRatingsComponent,
    NewsComponent,
    ProductDetailRatingsComponent,
    EmployeeCompanyComponent,
    NewPasswordDialogComponent,
    CompanyProductsComponent,
    DeleteAccountDialogComponent,
    ProductPanelComponent,
    ProductPanelUiComponent,
    ProductPanelUiCommentsComponent,
    ProductPanelUiRatingComponent,
    WatchedProductStarComponent,
    QrDialogComponent,
    AddExistingProductIconComponent
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
    MatTooltipModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
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
    ProfileComponent,
    NewPasswordDialogComponent,
    DeleteAccountDialogComponent,
    ErrorDialogComponent,
    QrDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
