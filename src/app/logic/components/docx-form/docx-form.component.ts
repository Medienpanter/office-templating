import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IInput } from '../../interfaces/input';
import { FormControlFactory } from '../../classes/form-control.factory';


@Component({
  selector: 'app-docx-form',
  templateUrl: './docx-form.component.html',
  styleUrls: ['./docx-form.component.scss']
})
export class DocxFormComponent implements OnInit {

  @Input() inputs: IInput[] = [];
  @Output() result = new EventEmitter();
  form: FormGroup;
  payLoad = '';

  ngOnInit() {
    this.generateFormGroup();
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    // console.log('PAYLOAD', this.form.value);
    this.result.emit(this.form.value);
  }

  private generateFormGroup() {
    const group: any = {};
    const formControlFactory = new FormControlFactory();
    this.inputs.forEach((input: IInput) => {
      group[input.name] = formControlFactory.getFormControl(input);
    });
    this.form = new FormGroup(group);
  }

}
