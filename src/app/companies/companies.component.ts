import { Component, OnInit, EventEmitter } from '@angular/core';
import { Company } from '../models/company';
import { DataService } from '../data.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany: Company;
  newCompany: Company = new Company();
  submitEmitter = new EventEmitter();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(): void {
    this.dataService.getObjects(Company).subscribe(companies => {
      this.companies = companies;
    });
  }

  onSelect(company: Company): void {
    this.selectedCompany = company;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    /*this.dataService.addCompany({name} as Company)
      .subscribe(company => {
        this.companies.push(company);
      });*/
  }

  delete(company: Company): void {
    this.companies = this.companies.filter(c => c !== company);
    this.dataService.deleteObject(company).subscribe();
  }

  onCompanyAddClick(): void {
    this.submitEmitter.emit();
    this.dataService.addObject(this.newCompany).subscribe(() => this.getCompanies());
  }
}
