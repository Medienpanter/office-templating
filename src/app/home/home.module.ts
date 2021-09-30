import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';

import { DocxFormComponent } from '../logic/components/docx-form/docx-form.component';
import { DynamicInputComponent } from '../logic/components/dynamic-input/dynamic-input.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HomeRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        DocxFormComponent,
        DynamicInputComponent
    ]
})
export class HomeModule {}
