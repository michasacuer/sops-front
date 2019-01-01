import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Statistic } from '../models/statistic';
import { Product } from '../models/product';
import { Company } from '../models/company';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  statistic: Statistic = new Statistic();
  lastAddedProduct: Product = new Product();
  lastAddedCompany: Company = new Company();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getStatistic();
    this.getLastProduct();
    this.getLastCompany();
  }

  getStatistic(): void {
    this.dataService
      .getObjectByUrl(Statistic, 'api/Statistic/getallcount')
      .subscribe(result => {
        this.statistic = result.object;
      });
  }

  getLastProduct(): void {
    this.dataService.getNewestObject(Product).subscribe(result => {
      this.lastAddedProduct = result.object;
    });
    /* this.dataService.getObjects(Product).subscribe(products => {
      this.lastAddedProduct = products.object.pop();
    }); */
  }

  getLastCompany(): void {
    this.dataService.getNewestObject(Company).subscribe(result => {
      this.lastAddedCompany = result.object;
    });
    /* this.dataService.getObjects(Company).subscribe(companies => {
      this.lastAddedCompany = companies.object.pop();
    }); */
  }
}
