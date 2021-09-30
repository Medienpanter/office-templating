import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../logic/store/reducer';
import { Document } from '../../../logic/models/document';
import { DocumentCreateDialogComponent } from '../../components/document-create-dialog/document-create-dialog.component';
import * as documentsActions from '../../../logic/store/documents/documents.actions';
import swal from 'sweetalert2';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  public documentsState$: Observable<Document[]>;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.documentsState$ = store.select('documents');
  }

  openDocumentCreateDialog(): void {
    const dialogRef = this.dialog.open(DocumentCreateDialogComponent, {
      minWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new documentsActions.AddDocument(result));
      }
    });
  }

  public deleteDocument(documentId: string): void {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes, delete it!',
      buttonsStyling: false
    }).then(() => {
      this.store.dispatch(new documentsActions.RemoveDocument(documentId));
    }).catch(swal.noop);
  }

}
