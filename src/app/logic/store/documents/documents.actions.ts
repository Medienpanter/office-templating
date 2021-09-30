import { Action } from '@ngrx/store';

import { Document } from '../../models/document';


export const LOAD_DOCUMENTS =                   '[Documents] Load Documents';
export const LOAD_DOCUMENTS_SUCCESS =           '[Documents] Load Documents Success';

export const ADD_DOCUMENT =                     '[Documents] Add Document';
export const ADD_DOCUMENT_SUCCESS =             '[Documents] Add Document Success';
export const ADD_DOCUMENT_FAIL =                '[Documents] Add Document Fail';

export const REMOVE_DOCUMENT =                  '[Documents] Remove Document';
export const REMOVE_DOCUMENT_SUCCESS =          '[Documents] Remove Document Success';
export const REMOVE_DOCUMENT_FAIL =             '[Documents] Remove Document Fail';

export const ADD_DOCUMENT_VERSION =             '[Documents] Add Document Version';
export const ADD_DOCUMENT_VERSION_SUCCESS =     '[Documents] Add Document Version Success';
export const ADD_DOCUMENT_VERSION_FAIL =        '[Documents] Add Document Version Fail';

export const REMOVE_DOCUMENT_VERSION =          '[Documents] Remove Document Version';
export const REMOVE_DOCUMENT_VERSION_SUCCESS =  '[Documents] Remove Document Version Success';
export const REMOVE_DOCUMENT_VERSION_FAIL =     '[Documents] Remove Document Version Fail';


export class LoadDocuments implements Action {
  readonly type = LOAD_DOCUMENTS;
}

export class LoadDocumentsSuccess implements Action {
  readonly type = LOAD_DOCUMENTS_SUCCESS;
  constructor(public payload: Document[]) {}
}

export class AddDocument implements Action {
  readonly type = ADD_DOCUMENT;
  constructor(public payload: { file: File; name: string; tags: string[]; fields: string[]; }) {}
}

export class AddDocumentSuccess implements Action {
  readonly type = ADD_DOCUMENT_SUCCESS;
  constructor(public payload: Document) {}
}

export class AddDocumentFail implements Action {
  readonly type = ADD_DOCUMENT_FAIL;
  constructor(public payload: any) {}
}

export class RemoveDocument implements Action {
  readonly type = REMOVE_DOCUMENT;
  constructor(public payload: string) {}
}

export class RemoveDocumentSuccess implements Action {
  readonly type = REMOVE_DOCUMENT_SUCCESS;
  constructor(public payload: string) {}
}

export class RemoveDocumentFail implements Action {
  readonly type = REMOVE_DOCUMENT_FAIL;
  constructor(public payload: any) {}
}

export class AddDocumentVersion implements Action {
  readonly type = ADD_DOCUMENT_VERSION;
  constructor(public payload: { documentId: string; file: File; tags: string[]; fields: string[]; }) {}
}

export class AddDocumentVersionSuccess implements Action {
  readonly type = ADD_DOCUMENT_VERSION_SUCCESS;
  constructor(public payload: Document) {}
}

export class AddDocumentVersionFail implements Action {
  readonly type = ADD_DOCUMENT_VERSION_FAIL;
  constructor(public payload: any) {}
}

export class RemoveDocumentVersion implements Action {
  readonly type = REMOVE_DOCUMENT_VERSION;
  constructor(public payload: { documentId: string; versionId: string }) {}
}

export class RemoveDocumentVersionSuccess implements Action {
  readonly type = REMOVE_DOCUMENT_VERSION_SUCCESS;
  constructor(public payload: { documentId: string; versionId: string }) {}
}

export class RemoveDocumentVersionFail implements Action {
  readonly type = REMOVE_DOCUMENT_VERSION_FAIL;
  constructor(public payload: any) {}
}


export type All
  = LoadDocuments
  | LoadDocumentsSuccess
  | AddDocument
  | AddDocumentSuccess
  | AddDocumentFail
  | RemoveDocument
  | RemoveDocumentSuccess
  | RemoveDocumentFail
  | AddDocumentVersion
  | AddDocumentVersionSuccess
  | AddDocumentVersionFail
  | RemoveDocumentVersion
  | RemoveDocumentVersionSuccess
  | RemoveDocumentVersionFail;

