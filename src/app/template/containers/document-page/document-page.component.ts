import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../logic/store/reducer';
import { map } from 'rxjs/operators';
import {IInput} from '../../../logic/interfaces/input';
import {DocumentService} from '../../../logic/services/document/document.service';
import {Document} from '../../../logic/models/document';
import {Docx} from '../../../logic/classes/docx';


@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent implements OnInit {

  public inputs: IInput[];
  private docx: Docx;
  private document$;

  constructor(private route: ActivatedRoute, private store: Store<AppState>,
              private documentService: DocumentService) {}

  ngOnInit() {
    this.document$ = this.route
                        .params
                        .switchMap(params =>
                          this.store.select('documents').pipe(
                            map((state: any[]) => state.find(document => document._id === params.id))
                          ));
  }

  public addNewRegistration(): void {
    this.document$
        .take(1)
        .switchMap((document: Document) =>
          this.documentService.downloadDoc(document.versions[document.versions.length - 1].serverName)
              .map((blob: Blob) => new Docx().loadFromBlob(blob, document.versions[document.versions.length - 1].originalName))
        ).subscribe((docx: Docx) => {
          this.docx = docx;
          this.inputs = docx.getUniqueInputs();
        });
  }

  public onFormResult(data: any): void {
    console.log('On form result', data);
  }



}
