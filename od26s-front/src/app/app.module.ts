import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MDBBootstrapModule, TableModule} from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import { CadEquipamentoComponent } from './cad-equipamento/cad-equipamento.component';
import { InstituicaoComponent } from './instituicao/instituicao.component';
import {InstituicaoService} from './service/instituicao.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/growl';
import {ConfirmationService, ConfirmDialogModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    CadEquipamentoComponent,
    InstituicaoComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    GrowlModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    GrowlModule,
    ConfirmDialogModule,
  ],
  providers: [
    InstituicaoService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

