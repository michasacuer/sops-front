import { Component, OnInit, EventEmitter } from "@angular/core";
import { Company } from "../models/company";
import { DataService, ModelState } from "../data.service";
import { ProfileDetails } from "../models/profile-details";
import { ErrorService } from "../error.service";
import { Product } from "../models/product";
import { ExistingProduct } from '../models/existing-product';
import { AuthService } from '../auth.service';

@Component({
  selector: "app-employee-company",
  templateUrl: "./employee-company.component.html",
  styleUrls: ["./employee-company.component.css"]
})
export class EmployeeCompanyComponent implements OnInit 
{
  company: Company = new Company();
  companyExistingProducts: ExistingProduct[] = [];

  newProduct: Product;
  selectedProduct: Product = new Product();

  submitEmitter = new EventEmitter();
  modelState = new ModelState();
  // companyProducts: Product[] = [];
  // profileDetails: ProfileDetails = new ProfileDetails();

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.newProduct = new Product();
    this.getCompany();
  }

  getCompany(): void {
    this.dataService.getObjectByUrl(Company, 
      `/api/Company/Profile?userid=${this.authService.currentUserId}`).subscribe(result => 
      {
        if (result.errorMessage === null)
        {
          this.company = result.object;
          
        }
        else
        {
          this.errorService.showError(result);
        }
        // console.log(this.company.products);

        // this.companyProducts = [];
/*         for (const item of this.company.products) {
          this.companyProducts.push(Object.assign(new Product(), item));
        } */
        this.newProduct = new Product();
        this.newProduct.companyId = this.company.id;
        // console.log(this.company);
      });
  }

  onProductNameClick(event, product: Product)
  {
    event.stopPropagation();

    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }

/*   onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  delete(product: Product): void {
    this.companyProducts = this.companyProducts.filter(p => p !== product);
    this.dataService
      .deleteObjectByFullUrl(`api/Product/${product.id}`)
      .subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    /*this.dataService.addproduct({name} as Product)
      .subscribe(product => {
        this.products.push(product);
      });
  }*/

  onProductAddClick(): void {
    this.submitEmitter.emit();
    this.dataService.postObject(this.newProduct).subscribe(result => {
      if (result.errorMessage === null) {
        this.modelState.update(result.modelState);
        this.getCompany();
      } else {
        this.errorService.showError(result);
      }
    });
  }
}
