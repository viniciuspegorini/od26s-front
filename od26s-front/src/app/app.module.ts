import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';


import {DropdownModule} from 'primeng/dropdown';
import {HttpClientModule} from '@angular/common/http';
import {PrecoComponent} from './preco/preco.component';
import {PrecoService} from './preco/preco.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/growl';
import {ConfirmationService, ConfirmDialogModule, DialogModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { EquipamentoService } from './services/equipamento.service';
library.add(fas);



@NgModule({
  declarations: [
    AppComponent,
    PrecoComponent
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
    DialogModule,
    DropdownModule

  ],
  providers: [
    PrecoService,
    EquipamentoService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}