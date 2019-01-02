import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsRatingsComponent } from './my-products-ratings.component';

describe('MyProductsRatingsComponent', () => {
  let component: MyProductsRatingsComponent;
  let fixture: ComponentFixture<MyProductsRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductsRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductsRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
