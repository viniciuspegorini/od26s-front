import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';



import {HttpClientModule} from '@angular/common/http';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {InstituicaoService} from './instituicao/instituicao.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/growl';
import {ConfirmationService, ConfirmDialogModule, DialogModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {fas} from '@fortawesome/free-solid-svg-icons';
library.add(fas);



@NgModule({
  declarations: [
    AppComponent,
    InstituicaoComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GrowlModule,
    ConfirmDialogModule,
    TableModule,
    FontAwesomeModule,
    DialogModule

  ],
  providers: [
    InstituicaoService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

