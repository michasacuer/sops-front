import { Component, OnInit, EventEmitter } from "@angular/core";
import { Company } from "../models/company";
import { DataService, ModelState } from "../data.service";
import { ProfileDetails } from "../models/profile-details";
import { ErrorService } from "../error.service";
import { Product } from "../models/product";
import { ExistingProduct } from '../models/existing-product';
import { AuthService } from '../auth.service';
import { getEditables } from '../model-decorators/display-decorators';
import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
import { saveAs } from 'file-saver';

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
  selectedProduct: Product;

  submitEmitter = new EventEmitter();
  modelState = new ModelState();

  dataReady: boolean = false;
  isHovered: boolean = true;
  // companyProducts: Product[] = [];
  // profileDetails: ProfileDetails = new ProfileDetails();

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private errorService: ErrorService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.newProduct = new Product();
    /* this.selectedProduct = new Product(); */
    this.getCompany();
  }

  getCompany(): void {
    this.dataService.getObjectByUrl(Company,
      `/api/Company/Profile?userid=${this.authService.currentUserId}`).subscribe(result => {
        if (result.errorMessage === null) 
        {
          const products = result.object.products.map(p => Object.assign(new Product(), p));
          this.company = result.object;
          this.company.products = products;

          for (let i = 0; i < this.company.products.length; ++i)
          {
            // let existingProducts = Array<ExistingProduct>();

            this.dataService.getObjectsByUrl(ExistingProduct, `api/ExistingProduct/ForProduct?id=${this.company.products[i].id}`).subscribe(res => {
              if (res.errorMessage === null)
              {
                const existingProducts = res.object.map(ep => Object.assign(new ExistingProduct(), ep));
                this.company.products[i].existingProducts = existingProducts;
                // console.log(JSON.stringify(this.company.products[i].existingProducts));

                if (i === this.company.products.length - 1)
                {
                  console.log('i: ' + i + ", products.length: " + this.company.products.length);
                  this.dataReady = true;
                }
              }
              else
              {
                this.errorService.showError(res);
              }
            });
          }
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
      });
  }

  onProductNameClick(event, product: Product)
  {
    event.stopPropagation();
    this.selectedProduct = product;
  }

  onShowPdfClick(existingProduct: ExistingProduct)
  {
    this.dataService.getPdfByUrl(`api/Document/${existingProduct.id}`).subscribe(result => {
			saveAs(result, 'document.pdf');
		});
  }

  onShowQrClick(existingProduct: ExistingProduct)
  {
    console.log('get QR: ' + JSON.stringify(existingProduct));
    const dialogRef = this.dialog.open(QrDialogComponent, {
      data: {
        existingProductId: existingProduct.id
      }
    });
  }

  onProductOrderedToDelete(productToDelete: Product)
  {
    console.log(JSON.stringify(productToDelete));

    const idx = this.company.products.findIndex(product => product.id === productToDelete.id);
    this.company.products.splice(idx, 1);
    this.selectedProduct = null;

    this.snackbar.open('product deleted successfully', null, {
      duration: 3000,
      panelClass: ['my-snackbar']
    });
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

        this.snackbar.open('product added successfully', null, {
          duration: 3000,
          panelClass: ['my-snackbar']
        });
      } else {
        this.errorService.showError(result);
      }
    });
  }

  mouseEnterOptions()
  {
    console.log('hello  ')
    this.isHovered = true;
  }

  mouseLeaveOptions()
  {
    this.isHovered = false;
  }

  isUndefined(x: any)
  {
    /* console.log(x);
    console.log(x != null); */
    return (x != null);
  }

  getNormalDate(abnormalDate: string): string
  {
    return abnormalDate.substring(0, 10).split("-").join(".");
  }
}
