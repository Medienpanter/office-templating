import { Input } from './input';
import { InputType } from '../enums/input-type.enum';
import { Tag } from './tag';


export class SelectInput extends Input {
    public readonly type = InputType.Select;

    public get value(): string { return this._value; }
    public set value(value: string) { this._value = value; }
    public get options(): string[] { return this._options; }

    protected _value: string;
    private _options: string[];

    constructor(tag: Tag) {
        super(tag);
        this._options = tag.selectList;
    }
}
