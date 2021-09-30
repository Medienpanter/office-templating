import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Docx } from '../../../logic/classes/docx';
import { IInput } from '../../../logic/interfaces/input';


@Component({
  selector: 'app-document-create-dialog',
  templateUrl: './document-create-dialog.component.html',
  styleUrls: ['./document-create-dialog.component.scss']
})
export class DocumentCreateDialogComponent implements OnInit {

  public error = '';
  public name: string;
  public file: File;

  private fields: string[];
  private tags: string[];

  constructor(public dialogRef: MatDialogRef<DocumentCreateDialogComponent>) {}

  ngOnInit() {}

  public submit(): void {
    this.error = '';
    if (!this.name) {
      this.error = 'Name field is required.';
      return;
    }
    if (!this.file) {
      this.error = 'File is required.';
      return;
    }
    this.dialogRef.close({
      name: this.name,
      file: this.file,
      fields: this.fields,
      tags: this.tags
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onFileSelect(input: HTMLInputElement): void {
    const document = new Docx();
    try {
      document.loadFromFile(input.files[0]).subscribe(docx => {
        this.file = input.files[0];
        this.tags = docx.tags.map(tag => tag.body);
        this.fields = docx.getUniqueInputs().map((i: IInput) => i.name);
      });
    } catch (exception) {
      console.error('ERROR: ', exception.message);
      this.error = exception.message;
    }
  }



}
