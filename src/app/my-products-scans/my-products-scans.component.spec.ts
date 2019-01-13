import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsScansComponent } from './my-products-scans.component';

describe('MyProductsScansComponent', () => {
  let component: MyProductsScansComponent;
  let fixture: ComponentFixture<MyProductsScansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductsScansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductsScansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
