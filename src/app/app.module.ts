import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompaniesComponent } from './companies/companies.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { AuthHttpInterceptor } from './authentication/auth-http-interceptor';
import { AuthComponent } from './auth/auth.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule,
   MatIconModule, MatDialogModule, MatCardModule,
   MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import { AuthLoginDialogComponent } from './auth-login-dialog/auth-login-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsComponent } from './products/products.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ErrorComponent } from './error/error.component';

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
    ErrorComponent
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
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    CookieService,
  ],
  entryComponents: [AuthLoginDialogComponent, ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
