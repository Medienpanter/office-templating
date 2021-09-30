import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import { Document } from '../../../logic/models/document';


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListComponent {

  @Input() documents: Document[];
  @Output() removeDoc = new EventEmitter<string>();

  public removeDocument(id: string) {
    this.removeDoc.emit(id);
  }

}
