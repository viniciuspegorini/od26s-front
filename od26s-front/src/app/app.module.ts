import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import { CadEquipamentoComponent } from './cad-equipamento/cad-equipamento.component';
import {FormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/growl';

@NgModule({
  declarations: [
    AppComponent,
    CadEquipamentoComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    GrowlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
