import { IInput } from '../interfaces/input';
import { Tag} from './tag';
import { TextInput } from './text';
import { CheckboxInput } from './checkbox';
import { NumberInput } from './number';
import { DateInput } from './date';
import { SelectInput } from './select';
import { TextareaInput } from './textarea';


export class InputFactory {
    readonly textInputNames = ['default', 'text', 'string'];
    readonly checkboxInputNames = ['yesNo', 'bool', 'boolean', 'yesno', 'checkbox'];
    readonly dateInputNames = ['date'];
    readonly numberInputNames = ['number'];
    readonly selectInputNames = ['select', 'pick', 'option', 'options'];
    readonly textareaInputNames = ['paragraph', 'description', 'textarea'];


    public getInput(tag: Tag): IInput {
        if (this.textInputNames.includes(tag.type)) {
            return new TextInput(tag);
        } else if (this.textareaInputNames.includes(tag.type)) {
          return new TextareaInput(tag);
        } else if (this.checkboxInputNames.includes(tag.type)) {
            return new CheckboxInput(tag);
        } else if (this.dateInputNames.includes(tag.type)) {
            return new DateInput(tag);
        } else if (this.numberInputNames.includes(tag.type)) {
            return new NumberInput(tag);
        } else if (this.selectInputNames.includes(tag.type)) {
            return new SelectInput(tag);
        } else {
            throw Error(`Unknown input: ${tag.type}`);
        }
    }

}
