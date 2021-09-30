import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import documentsReducer, * as fromDocuments from './documents/documents.reducer';


export interface AppState {
  documents: fromDocuments.DocumentsState;
}

const reducers: ActionReducerMap<AppState> = {
  documents: documentsReducer,
};

export function getReducers(): ActionReducerMap<AppState> {
  return reducers;
}

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');
