import { Input } from './input';
import { InputType } from '../enums/input-type.enum';
import { Tag } from './tag';


export class CheckboxInput extends Input {
    public readonly type = InputType.Checkbox;

    public get value(): boolean { return this._value; }
    public set value(value: boolean) { this._value = value; }

    protected _value: boolean;

    constructor(tag: Tag) {
        super(tag);
        this.value = false;
    }
}