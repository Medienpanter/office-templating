import { InputType } from '../enums/input-type.enum';
import { IParameter } from './parameter';

export interface IInput {
    value: any;
    name: string;
    placeholder: string;
    type: InputType;

    options?: string[];
    parameters?: IParameter[];
}
