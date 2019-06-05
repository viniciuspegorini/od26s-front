import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from "@angular/forms";

import {HttpClientModule} from '@angular/common/http';
import { PessoaComponent } from './pessoa/pessoa.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {GrowlModule} from 'primeng/growl';
import {DialogModule} from 'primeng/dialog';
import {ConfirmationService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import { PessoaService } from './pessoa/pessoa.service';
import { PermissaoService } from './permissao/permissao.service';

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    PermissaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    TableModule,
    ConfirmDialogModule,
    GrowlModule,
    DialogModule,
    DataViewModule,
    PanelModule,
    DropdownModule,

  ],
  providers: [
    PessoaService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
