import { Input } from './input';
import { InputType } from '../enums/input-type.enum';
import { Tag } from './tag';


export class NumberInput extends Input {
    public readonly type = InputType.Number;

    public get value(): number { return this._value; }
    public set value(value: number) { this._value = value; }

    protected _value: number;

    constructor(tag: Tag) {
        super(tag);
    }
}