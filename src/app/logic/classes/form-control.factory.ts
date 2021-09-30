import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { IInput } from '../interfaces/input';
import { IParameter } from '../interfaces/parameter';
import { InputType } from '../enums/input-type.enum';


export class FormControlFactory {

  public getFormControl(input: IInput): FormControl {
    const validators: ValidatorFn[] = [];
    let params: IParameter[];
    if (params = input.parameters) {
      params.forEach((param: IParameter) => {
        const validator = this.getValidator(param, input.type);
        if (validator) {
          validators.push(validator);
        }
      });
    }
    return new FormControl(input.value || '', [...validators]);
  }

  private getValidator(param: IParameter, type: InputType) {
    switch (param.name) {
      case 'required': {
        return Validators.required;
      }
      case 'mustBeTrue': {
        return type === InputType.Checkbox ? Validators.requiredTrue : null;
      }
      case 'min': {
        if (param.arg === undefined || isNaN(Number(param.arg))) { return null; }
        if (type === InputType.Number) {
          return Validators.min(Number(param.arg));
        }
        return null;
      }

      case 'max': {
        if (param.arg === undefined || isNaN(Number(param.arg))) { return null; }
        if (type === InputType.Number) {
          return Validators.max(Number(param.arg));
        }
        return null;
      }

      case 'minLength': {
        if (param.arg === undefined || isNaN(Number(param.arg))) { return null; }
        if (type === InputType.Text || type === InputType.Textarea) {
          return Validators.minLength(Number(param.arg));
        }
        return null;
      }

      case 'maxLength': {
        if (param.arg === undefined || isNaN(Number(param.arg))) { return null; }
        if (type === InputType.Text || type === InputType.Textarea) {
          return Validators.maxLength(Number(param.arg));
        }
        return null;
      }
    }
    return null;
  }

}
