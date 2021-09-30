import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as documentsActions from './documents.actions';
import { Document, DocumentVersion } from '../../models/document';
import { DocumentService } from '../../services/document/document.service';


@Injectable()
export class DocumentsEffects {

  @Effect() loadDocuments$: Observable<Action> = this.update$.ofType(documentsActions.LOAD_DOCUMENTS)
    .pipe(
      switchMap(() => this.documentService.getDocuments()),
      map((documents: Document[]) => new documentsActions.LoadDocumentsSuccess(documents))
    );

  @Effect() addDocument$: Observable<Action> = this.update$.ofType(documentsActions.ADD_DOCUMENT)
    .pipe(
      map((action: documentsActions.AddDocument) => action.payload),
      switchMap((payload: { file: File; name: string; tags: string[]; fields: string[]; }) =>
        this.documentService.postNewDocument(payload.file, payload.name, payload.tags, payload.fields)),
      map((document: Document) => new documentsActions.AddDocumentSuccess(document)),
      catchError(error => of(new documentsActions.AddDocumentFail(error)))
    );

  @Effect() removeDocument$: Observable<Action> = this.update$.ofType(documentsActions.REMOVE_DOCUMENT)
    .pipe(
      map((action: documentsActions.RemoveDocument) => action.payload),
      switchMap((payload: string) => this.documentService.deleteDocument(payload)
        .pipe(
          map((document: Document) => new documentsActions.RemoveDocumentSuccess(payload)),
          catchError(error => of(new documentsActions.RemoveDocumentFail(error)))
        )
      )
    );

  @Effect() addDocumentVersion$: Observable<Action> = this.update$.ofType(documentsActions.ADD_DOCUMENT_VERSION)
    .pipe(
      map((action: documentsActions.AddDocumentVersion) => action.payload),
      switchMap((payload: { documentId: string; file: File; tags: string[]; fields: string[]; }) =>
        this.documentService.postDocumentVersion(payload.documentId, payload.file, payload.tags, payload.fields)),
      map((document: Document) => new documentsActions.AddDocumentVersionSuccess(document))
    );

  @Effect() removeDocumentVersion$: Observable<Action> = this.update$.ofType(documentsActions.REMOVE_DOCUMENT_VERSION)
    .pipe(
      map((action: documentsActions.RemoveDocumentVersion) => action.payload),
      switchMap((payload: { documentId: string; versionId: string }) =>
        this.documentService.deleteDocumentVersion(payload.documentId, payload.versionId)
        .pipe(
          map((document: Document) => new documentsActions.RemoveDocumentVersionSuccess(payload)),
          catchError(error => of(new documentsActions.RemoveDocumentVersionFail(error))))
        )
    );

  constructor(private update$: Actions, private documentService: DocumentService) {}

}
