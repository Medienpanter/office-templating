import { IFilter } from '../interfaces/filter';
import { IInput } from '../interfaces/input';
import {InputFactory} from './input.factory';
import {IParameter} from '../interfaces/parameter';
import {FilterFactory} from './filter.factory';


/**
 * Klasa reprezentuje pojedynczy tag np. {nazwa}.
 * Jeśli w dokumencie występuje kilka takich samych tagów, każdy jest reprezentowany z osobna w klasie Tag.
 */
export class Tag {

    public get id(): string { return this._id; }
    public get name(): string { return this._name; }
    public get type(): string { return this._type; }
    public get filters(): IFilter[] { return this._filters; }
    public get body(): string { return this._body; }
    public get isEval(): boolean { return this._isEval; }
    public get selectList(): string[] { return this._selectList; }
    public get parameters(): IParameter[] { return this._parameters; }

    public get value(): string {
      if (this._isEval) {
        return this._evalValue;
      }
      let val = this.input.value.toString();
      const filterFactory = new FilterFactory();
      this._filters.forEach((filter: IFilter) => val = filterFactory.getFilterFn(filter)(val));
      return val;
    }

    public input: IInput;

    /**
     * id - unikalny identyfikator tagu
     */
    private _id: string;

    /**
     * name - nazwa tagu (np. {nazwa}), w dokumencie może być wiele tagów o tej samej nazwie
     */
    private _name: string;

    /**
     * type - typ tagu np. {nazwa:typ}
     */
    private _type: string;

    /**
     * selectList - lista parametrów typu np. dla typu select[raz, dwa, trzy] - ['raz', 'dwa', 'trzy']
     */
    private _selectList: string[];

    /**
     * filters - lista filtrów do zaplikowania na wartości tagu
     */
    private _filters: IFilter[] = [];

    /**
     * body - zawartość tagu np. dla {nazwa:text | uppercase} - nazwa:text | uppercase
     */
    private _body: string;

    /**
     * isEval - flaga oznaczająca czy tag jest typu eval, np. {=netto * 0.23}
     */
    private _isEval: boolean;

    /**
     * evalFormula - formula w wersji tekstowej np. dla {= netto + (netto * 0.23)} - 'netto + (netto * 0.23)'
     */
    private _evalFormula: string;

    /**
     * evalValue - przeliczona wartość formuły dla evala
     */
    private _evalValue: string;

    /**
     * parameters - lista parametrow np. dla {nazawa:number(required, max=6)} - ['required', 'max=6']
     */
    private _parameters: IParameter[];


    constructor(body: string) {
        this._body = body;
        this.generateId();
        this.parse();
        if (!this.isEval) {
          this.generateInput();
        }
    }

    public feedEval(data: { name: string; value: string; }[]) {
      let formula = this._evalFormula;
      data.forEach(item => {
        const re = new RegExp(item.name, 'gi');
        formula = formula.replace(re, item.value);
      });
      this._evalValue = eval(formula);
    }

    private parse(): void {
        const body = this._body.trim();
        if (body.startsWith('=')) {
            this._isEval = true;
            this.parseEval();
        } else {
            this._isEval = false;
            this.parseStandard();
        }
    }

    private parseEval(): void {
      const body = this._body.trim();
      this._evalFormula = body.slice(1).trim();
    }

    private parseStandard(): void {
        const body = this._body.trim();
        const hasFilter = body.includes('|');
        const hasType = body.includes(':');

        this.parseName(body, hasFilter, hasType);

        if (hasType) {
            if (hasFilter) {
                const bodyBeforeBar = body.split('|')[0];  // jesli tag ma filtr to do parsera typu przekazujemy tylko czesc przed filtrem
                this.parseType(bodyBeforeBar);
            } else {
                this.parseType(body);
            }
        } else {
            this._type = 'default';
        }

        if (hasFilter) {
            this.parseFilter(body);
        }
    }

    private parseName(body: string, hasFilter: boolean, hasType: boolean): void {
        if (hasType) {
            this._name = body.split(':')[0].trim();
        } else if (hasFilter) {
            this._name = body.split('|')[0].trim();
        } else {
            this._name = body.trim();
        }
    }

    private parseType(body: string): void {
        const bodyAfterColon = body.split(':')[1].trim();  // jeśli w body jest ':' to podziel po nim i wez drugi element (ten po ':')
        this._type = bodyAfterColon.split(' ')[0];      // podziel po spacji i wez pierwszy element
        if (this._type.includes('[')) {                   // jeśli typ zawiera znak '[' - co oznacza ze zawiera listę opcji
            const selectType = bodyAfterColon.split(']')[0];   // to podziel po znaku zamkniecia listy ']' i wez pierwszy element
            this._type = selectType.split('[')[0];
            const selectListString = selectType.split('[')[1];
            this._selectList = selectListString.split(',').map((param: string) => param.trim());
            if (bodyAfterColon.split(']')[1].includes('(')) {   // jesli po zamknieciu listy wystapi '(' to znaczy ze sa params
                const splitByOpenBracket = bodyAfterColon.split(']')[1].split('(');
                const paramString = splitByOpenBracket[1].split(')')[0];  // wszystko po '(' dzielimy po ')' i 0 element jest params
                const parametersStrings = paramString.split(',').map((param: string) => param.trim());  // dzielimy po ',' i trim each
                this._parameters = parametersStrings.map((param: string) => {
                  return param.includes('=') ?
                    { name: param.split('=')[0], arg: param.split('=')[1] } :
                    { name: param };
                });
            }
        } else {  // jeśli typ nie jest selectem sprawdzamy w domyslny sposob czy ma parametry
            if (this._type.includes('(')) {  // jeśli typ posiada znak '(' oznacza to, ze ma paramtery
                const splitByOpenBracket = bodyAfterColon.split('(');  // dzielimy po znaku otwierajacym parametry
                this._type = splitByOpenBracket[0].trim();  // przed znakiem otwierajacym parametry jest zawsze typ
                const paramString = splitByOpenBracket[1].split(')')[0];  // wszystko po '(' dzielimy po ')' i 0 element jest params
                const parametersStrings = paramString.split(',').map((param: string) => param.trim());  // dzielimy po ',' i trim each
                this._parameters = parametersStrings.map((param: string) => {
                  return param.includes('=') ?
                    { name: param.split('=')[0], arg: param.split('=')[1] } :
                    { name: param };
                });
            }
        }
    }

    private parseFilter(body: string): void {
      const filterStringList = body.split('|').slice(1);
      filterStringList.forEach((filterStr: string) => {
        if (filterStr.includes('(')) {
          const parts = filterStr.split('(').map(part => part.trim());
          const filterName = parts[0];
          const filterParamsString = parts[1].slice(0, -1); //  usuniecie ostatniego znaku ')'
          const filterParams = filterParamsString.split(',').map((param: string) => param.trim());
          this._filters.push({ name: filterName, args: filterParams } as IFilter);
        } else {
          this._filters.push({ name: filterStr.trim() } as IFilter);
        }
      });
    }

    private generateInput(): void {
      const inputFactory = new InputFactory();
      this.input = inputFactory.getInput(this);
    }

    private generateId(): void {
        this._id = 'ID_' + (Math.random().toString(32).substr(2, 8));
    }

}
