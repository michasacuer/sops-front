import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-existing-product-icon',
  templateUrl: './add-existing-product-icon.component.html',
  styleUrls: ['./add-existing-product-icon.component.css']
})
export class AddExistingProductIconComponent implements OnInit 
{
  @Output()
  addExistingProduct = new EventEmitter<number>();

  constructor(private productId: number) {}

  ngOnInit() {}

  onAddExistingProductIconClick()
  {
    this.addExistingProduct.emit(this.productId);
  }
}
