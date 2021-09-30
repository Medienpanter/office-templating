import { Component, OnInit } from '@angular/core';

import { Docx } from '../logic/classes/docx';
import { IInput } from '../logic/interfaces/input';
import { DocumentService } from '../logic/services/document/document.service';
import {Document} from '../logic/models/document';
import swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public inputs: IInput[];
    public error: string;
    public documentParsed = false;

    public myDocs: Document[];

    private document: Docx;
    private file: File;

    constructor(private documentService: DocumentService) {}

    ngOnInit() {
      this.documentService.getDocuments().subscribe((docs: Document[]) => this.myDocs = docs);
    }

    // TODO to delete
    public download(filename: string) {
      const downloadFile = (blob: Blob) => {
        this.document = new Docx();
        this.documentParsed = false;
        this.document.loadFromBlob(blob, filename).subscribe((docx: Docx) => {
          this.inputs = docx.getUniqueInputs();
          this.documentParsed = true;
        });
      };

      this.documentService.downloadDoc(filename).subscribe((res: Blob) => {
        console.log(res);
        downloadFile(res);
    });
    }

    public uploadNewDocument(): void {
      const tags = this.document.tags.map(tag => tag.body);
      const fields = this.inputs.map((i: IInput) => i.name);
      const name = 'TEST'; // TODO
      this.documentService.postNewDocument(this.file, name, tags, fields)
                          .subscribe(
                            (doc: Document) => this.myDocs.push(doc)
                          );
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
        this.documentService
            .deleteDocument(documentId)
            .subscribe(
              (doc: Document) => {
                swal({
                  title: 'Deleted!',
                  text: 'Your document has been deleted.',
                  type: 'success',
                  confirmButtonClass: 'btn btn-success',
                  buttonsStyling: false
                });
                this.myDocs = this.myDocs.filter((document: Document) => document._id !== doc._id);
              });
      }).catch(swal.noop);
    }

  public deleteDocumentVersion(documentId: string, versionId: string): void {
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
      this.documentService
        .deleteDocumentVersion(documentId, versionId)
        .subscribe(
          (doc: Document) => {
            swal({
              title: 'Deleted!',
              text: 'Your document version has been deleted.',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });
            this.myDocs = this.myDocs.map(
              (document: Document) => document._id !== doc._id ?
                                              document :
                                              {
                                                ...document,
                                                versions: document.versions.filter(version => version._id !== versionId)
                                              });
          });
    }).catch(swal.noop);
  }

    public onFileSelect(input: HTMLInputElement): void {
        this.document = new Docx();
        this.documentParsed = false;
        try {
            this.document.loadFromFile(input.files[0]).subscribe(docx => {
              this.file = input.files[0];
              this.inputs = docx.getUniqueInputs();
              this.documentParsed = true;
            });
        } catch (exception) {
            console.error('ERROR: ', exception.message);
            this.error = exception.message;
        }
    }

    public onFormResult(result: {}): void {
      this.documentService.postDocumentRegistration(this.myDocs[0]._id, this.myDocs[0].versions[0]._id, result).subscribe(
        res => console.log(res)
      );
      // this.document.setValues(result);
      // this.document.renderDocument();
    }

}
