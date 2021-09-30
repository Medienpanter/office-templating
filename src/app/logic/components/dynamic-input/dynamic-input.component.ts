import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IInput } from '../../interfaces/input';
import { InputType } from '../../enums/input-type.enum';


@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent {
  @Input() input: IInput;
  @Input() form: FormGroup;
  InputType = InputType;
}
