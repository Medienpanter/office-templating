import { Input } from './input';
import { InputType } from '../enums/input-type.enum';
import { Tag } from './tag';


export class TextInput extends Input {
    public readonly type = InputType.Text;
    public get value(): string { return this._value; }
    public set value(value: string) { this._value = value; }

    protected _value: string;

    constructor(tag: Tag) {
        super(tag);
    }
}
