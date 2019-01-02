import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsWatchedComponent } from './my-products-watched.component';

describe('MyProductsWatchedComponent', () => {
  let component: MyProductsWatchedComponent;
  let fixture: ComponentFixture<MyProductsWatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductsWatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductsWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
