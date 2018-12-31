import 'reflect-metadata';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { getEditables, getDisplayName, isPassword } from '../model-decorators/display-decorators';
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
      control.propertyKey = property;
      control.name = getDisplayName(this.model, property);
      control.isPassword = isPassword(this.model, property);

      group.push(control);
    }

    return new ModelFormArrayControl(group);
  }
}
