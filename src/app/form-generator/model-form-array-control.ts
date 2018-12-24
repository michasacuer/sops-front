import { FormArray } from '@angular/forms';
import { ModelFormControl } from './model-form-control';

export class ModelFormArrayControl extends FormArray {
  getModelFormControls(): ModelFormControl[] {
    return this.controls as ModelFormControl[];
  }

  updateModel(model: any) {
    const modelControls = this.getModelFormControls();
    for (const control of modelControls) {
      model[control.propertyKey] = control.value;
    }
  }
}
