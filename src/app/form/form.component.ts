import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGenerator } from '../form-generator/form-generator';
import { FormGroup, FormArray } from '@angular/forms';
import { ModelFormArrayControl } from '../form-generator/model-form-array-control';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input()
  set model(model: any) {
    this._model = model;
    const generator = new FormGenerator(this._model);
    this.formArray = generator.generate();
  }

  @Output() submit = new EventEmitter<any>();

  _model: any;
  formArray: ModelFormArrayControl;
  generator: FormGenerator;

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(): void {
    this.formArray.updateModel(this._model);
    this.submit.emit(this._model);
  }
}
