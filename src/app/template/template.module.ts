import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageComponent } from './containers/manage/manage.component';
import { TemplateRoutes } from './template.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { MdModule } from '../md/md.module';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentCreateDialogComponent } from './components/document-create-dialog/document-create-dialog.component';
import { DocumentPageComponent } from './containers/document-page/document-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TemplateRoutes),
    FormsModule,
    MdModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ManageComponent,
    DocumentListComponent,
    DocumentCreateDialogComponent,
    DocumentPageComponent,
  ],
  entryComponents: [
    DocumentCreateDialogComponent
  ]
})
export class TemplateModule { }
