import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedProductStarComponent } from './watched-product-star.component';

describe('WatchedProductStarComponent', () => {
  let component: WatchedProductStarComponent;
  let fixture: ComponentFixture<WatchedProductStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedProductStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedProductStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
