import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPanelUiCommentsComponent } from './product-panel-ui-comments.component';

describe('ProductPanelUiCommentsComponent', () => {
  let component: ProductPanelUiCommentsComponent;
  let fixture: ComponentFixture<ProductPanelUiCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPanelUiCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPanelUiCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
