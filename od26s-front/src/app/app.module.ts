import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {AccordionModule, AutoCompleteModule, ConfirmDialogModule, DialogModule, GrowlModule, TabViewModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {PrecoComponent} from "./preco/preco.component";
import {PrecoService} from "./services/preco.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    PrecoComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AccordionModule,
    GrowlModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule,
    DataViewModule,
    AutoCompleteModule,
    TabViewModule,
    CKEditorModule
  ],
  providers: [
    ConfirmationService,
    PrecoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
