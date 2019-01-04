import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCompanyProductsComponent } from './employee-company-products.component';

describe('EmployeeCompanyProductsComponent', () => {
  let component: EmployeeCompanyProductsComponent;
  let fixture: ComponentFixture<EmployeeCompanyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCompanyProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCompanyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
