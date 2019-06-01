import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {TableModule} from 'primeng/table';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GrowlModule} from 'primeng/growl';
import {ConfirmationService, ConfirmDialogModule, ProgressSpinnerModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    CadEquipamentoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    FontAwesomeModule,
    DialogModule,
    FormsModule,
    BrowserAnimationsModule,
    GrowlModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
