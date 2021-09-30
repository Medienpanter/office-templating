import { IInput } from '../interfaces/input';
import { InputType } from '../enums/input-type.enum';
import { Tag } from './tag';
import { IParameter } from '../interfaces/parameter';


export abstract class Input implements IInput {

    public readonly abstract type: InputType;

    public abstract get value();
    public abstract set value(value: any);

    public get name(): string { return this._name; }
    public get placeholder(): string { return this._placeholder; }
    public get parameters(): IParameter[] { return this._parameters; }

    protected abstract _value: any;
    private _name: string;
    private _placeholder: string;
    private _parameters: IParameter[];

    constructor(tag: Tag) {
      this._name = tag.name;
      this._placeholder = tag.name;
      this._parameters = tag.parameters;
    }
}
