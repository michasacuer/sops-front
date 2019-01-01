import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGenerator } from '../form-generator/form-generator';
import { FormGroup, FormArray } from '@angular/forms';
import { ModelFormArrayControl } from '../form-generator/model-form-array-control';
import { ModelState } from '../data.service';

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
  @Input()
  submit: EventEmitter<any>;

  @Input()
  modelState: ModelState<any> = new ModelState();

  _model: any;
  formArray: ModelFormArrayControl;
  generator: FormGenerator;

  constructor() { }

  ngOnInit() {
    this.submit.subscribe(() => {
      this.formArray.updateModel(this._model);
    });
  }
}
