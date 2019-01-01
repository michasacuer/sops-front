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

    for (const propertyName of properties) {
      const dataType = Reflect.getMetadata('design:type', this.model, propertyName);
      const control = new ModelFormControl(this.model[propertyName], Validators.required);
      control.propertyKey = propertyName;
      control.name = getDisplayName(this.model, propertyName);

      if (isPassword(this.model, propertyName)) {
        control.inputType = 'password';
      } else if (dataType === Date) {
        control.inputType = 'date';
      } else {
        control.inputType = 'text';
      }

      group.push(control);
    }

    return new ModelFormArrayControl(group);
  }
}
