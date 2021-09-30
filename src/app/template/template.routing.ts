import { Routes } from '@angular/router';

import { ManageComponent } from './containers/manage/manage.component';
import { DocumentPageComponent } from './containers/document-page/document-page.component';


export const TemplateRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage',
        component: ManageComponent
      }, {
        path: 'documents/:id',
        component: DocumentPageComponent
      }, {
        path: '',
        redirectTo: 'manage'
      }
    ]
  }
];
