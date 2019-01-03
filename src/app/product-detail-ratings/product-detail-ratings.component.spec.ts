import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailRatingsComponent } from './product-detail-ratings.component';

describe('ProductDetailRatingsComponent', () => {
  let component: ProductDetailRatingsComponent;
  let fixture: ComponentFixture<ProductDetailRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
