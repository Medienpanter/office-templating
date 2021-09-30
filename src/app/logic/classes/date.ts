import { Input } from './input';
import { InputType } from '../enums/input-type.enum';
import { Tag } from './tag';


export class DateInput extends Input {
    public readonly type = InputType.Date;

    public get value(): string { return this._value ? this._value.toLocaleDateString() : ''; }
    public set value(value: string) { this._value = new Date(value); }

    protected _value: Date;

    constructor(tag: Tag) {
        super(tag);
    }
}
