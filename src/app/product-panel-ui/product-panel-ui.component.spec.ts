import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPanelUiComponent } from './product-panel-ui.component';

describe('ProductPanelUiComponent', () => {
  let component: ProductPanelUiComponent;
  let fixture: ComponentFixture<ProductPanelUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPanelUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPanelUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
