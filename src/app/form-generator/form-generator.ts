import 'reflect-metadata';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { getEditables, getDisplayName } from '../model-decorators/display-decorators';
import { ModelFormControl } from '../form-generator/model-form-control';
import { ModelFormArrayControl } from './model-form-array-control';

export class FormGenerator {
  constructor(private model: any) {

  }

  public generate(): ModelFormArrayControl {
    const properties: string[] = getEditables(this.model);
    const group: any = [];

    for (const property of properties) {
      // const dataType = Reflect.getMetadata('design:type', this.model, property);
      const control = new ModelFormControl(this.model[property], Validators.required);
      control.name = getDisplayName(this.model, property);
      control.propertyKey = property;

      group.push(control);
    }

    return new ModelFormArrayControl(group);
  }
}
