import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingProductIconComponent } from './add-existing-product-icon.component';

describe('AddExistingProductIconComponent', () => {
  let component: AddExistingProductIconComponent;
  let fixture: ComponentFixture<AddExistingProductIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExistingProductIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExistingProductIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
