import { saveAs } from 'file-saver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Tag } from './tag';
import { IInput } from '../interfaces/input';
import { InputType } from '../enums/input-type.enum';


declare var JSZip: any;
declare var Docxtemplater: any;


export class Docx {

    public get name(): string { return this._name; }
    public get tags(): Tag[] { return this._tags; }

    private zip: any;
    private document: any;
    private _name: string;
    private _tags: Tag[];
    private bodyToId = new Map<string, string>();  // body:id

    constructor() {
      this._tags = [];
    }

    public loadFromFile(file: File): Observable<Docx> {
        const error = this.validateFile(file);
        if (error) {
            throw new TypeError(error);
        }

        const fileReader: FileReader = new FileReader();
        const fileReader$ = Observable.fromEvent(fileReader, 'load')
            .map((event: any) => {
                const content = event.target.result;
                const zip = new JSZip(content);
                this.zip = zip;
                this.document = new Docxtemplater().loadZip(zip);
                this._name = file.name;
                this.loadTags();
                this.generateBodyToIdMap();
                this.replaceNamesToIds();
                return this;
            });
        fileReader.readAsArrayBuffer(file);
        return fileReader$;
    }

    public loadFromBlob(blob: Blob, fileName: string): Observable<Docx> {
      const newFile: any = blob;
      newFile.lastModifiedDate = new Date();
      newFile.name = fileName;
      return this.loadFromFile(newFile as File);
    }

    public getText(): string {
        return this.document.getFullText();
    }

    public getTags(): string[] {
      return this.getText().match(/{[\w- żźćńółęąśŻŹĆĄŚĘŁÓŃ$&+,:;=?@#|\\'<>.^*\[\]()%!]*}/g);
    }

  /**
   * Return list of unique inputs.
   * @returns {IInput[]}
   */
  public getUniqueInputs(): IInput[] {
      const inputs: IInput[] = [];
      this._tags.filter((tag: Tag) => !tag.isEval)
                .forEach((tag: Tag) => {
        const name = tag.input.name;
        const index = inputs.findIndex((i: IInput) => i.name === name);
        if (index > -1) {
          if (inputs[index].type === InputType.Text && tag.input.type !== InputType.Text) {
            inputs[index] = tag.input;
          }
        } else {
          inputs.push(tag.input);
        }
      });
      return inputs;
    }

    public setValues(values: {}): void {
      Object.keys(values).forEach(key => {
        this._tags.filter((tag: Tag) => tag.name === key)
          .forEach((tag: Tag) => tag.input.value = values[key].toString());
      });
      const dataForEvals = this._tags.filter((tag: Tag) => !tag.isEval)
                                     .map((tag: Tag) => ({ name: tag.name, value: tag.input.value.toString() }));
      this._tags.filter((tag: Tag) => tag.isEval).forEach((tag: Tag) => tag.feedEval(dataForEvals));
    }

    public renderDocument(): void {
      const data = {};
      this._tags.forEach((tag: Tag) => { data[tag.id] = tag.value; });
      this.renderTemplate(data);
      this.save();
    }

    private renderTemplate(data: {}): void {
        this.document.setData(data);
        try {
            this.document.render();
        } catch (error) {
            const e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            };
            console.error(JSON.stringify({ error: e }));
            throw error;
        }
    }

    private save(): void {
        const buffer = this.document.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        saveAs(buffer, this._name);
    }

    private loadTags(): void {
      const tagsBodies = this.getTags();
      tagsBodies.forEach((body: string) => {
        const cleanedBody = body.substring(1, body.length - 1);  // usuwa '{' z poczatku i '}' z konca
        this._tags.push(new Tag(cleanedBody));
      });
    }

    private generateBodyToIdMap(): void {
      this._tags.forEach((tag: Tag) => {
        this.bodyToId.set(`{${tag.body}}`, `{${tag.id}}`);
      });
    }

    private replaceNamesToIds(): void {
      const data = {};
      this.bodyToId.forEach((id: string, body: string, map: Map<string, string>) => {
        data[body.substring(1, body.length - 1)] = id;
      });
      this.document.setData(data);
      this.document.render();
      const buffer = this.document.getZip();
      this.document = new Docxtemplater().loadZip(buffer);
    }

    private validateFile(file: File): string {
        if (file.name.split('.').pop() !== 'docx') {
            return 'Zły format pliku, wybierz .docx';
        }
        return '';
    }
}
