import { isUndefined } from 'util';
import { IFilter } from '../interfaces/filter';


export class FilterFactory {

  public getFilterFn(filter: IFilter): Function {
    const defaultFn = (value: string) => value;
    switch (filter.name) {
      case 'uppercase': {
        return (value: string) => value.toUpperCase();
      }
      case 'lowercase': {
        return (value: string) => value.toLowerCase();
      }
      case 'title': {
        return (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
      }
      case 'slice': {
        if (!isUndefined(filter.args) && filter.args.length) {
          if (this.checkIfAllAreNumbers(filter.args)) {
            return (value: string) => value.slice(...filter.args.map(i => Number(i)));
          }
        }
        return defaultFn;
      }
      default: {
        return defaultFn;
      }
    }
  }

  private checkIfAllAreNumbers(args: string[]): boolean {
    return !(args.map((arg: string) => !isNaN(Number(arg)))
               .filter((flag: boolean) => flag === false)
               .length > 0);
  }

}
