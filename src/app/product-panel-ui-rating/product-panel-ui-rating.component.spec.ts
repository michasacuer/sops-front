import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPanelUiRatingComponent } from './product-panel-ui-rating.component';

describe('ProductPanelUiRatingComponent', () => {
  let component: ProductPanelUiRatingComponent;
  let fixture: ComponentFixture<ProductPanelUiRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPanelUiRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPanelUiRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
