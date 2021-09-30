import * as documentsActions from './documents.actions';
import { Document, DocumentVersion } from '../../models/document';


export type Action = documentsActions.All;

export type DocumentsState = Document[];

const initialState: Document[] = [];


export default function (state: DocumentsState = initialState, action: Action): DocumentsState {

  switch (action.type) {

    case documentsActions.LOAD_DOCUMENTS_SUCCESS: {
      return [...action.payload];
    }

    case documentsActions.ADD_DOCUMENT_SUCCESS: {
      return [...state, action.payload];
    }

    case documentsActions.ADD_DOCUMENT_FAIL: {
      console.log('ADD_DOCUMENT_FAIL', action.payload);
      return state;
    }

    case documentsActions.REMOVE_DOCUMENT_SUCCESS: {
      return state.filter((document: Document) => document._id !== action.payload);
    }

    case documentsActions.ADD_DOCUMENT_VERSION_SUCCESS: {
      return state.map((document: Document) => {
        return document._id !== action.payload._id ?
            document
          : action.payload;
      });
    }

    case documentsActions.ADD_DOCUMENT_VERSION_FAIL: {
      // TODO
      console.log('ADD_DOCUMENT_VERSION_FAIL', action.payload);
      return state;
    }

    case documentsActions.REMOVE_DOCUMENT_VERSION_SUCCESS: {
      return state.map((document: Document) => {
        return document._id !== action.payload.documentId ?
          document :
          { ...document,
            versions: document.versions.filter((version: DocumentVersion) => version._id !== action.payload.versionId)
          };
      });
    }

    case documentsActions.REMOVE_DOCUMENT_VERSION_FAIL: {
      // TODO
      console.log('REMOVE_DOCUMENT_VERSION_FAIL', action.payload);
      return state;
    }

    default: {
      return state;
    }
  }
}
