import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import {
  AccordionModule,
  AutoCompleteModule,
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule, TabViewModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './login/login.component';
import {DataViewModule} from 'primeng/dataview';
import {LoginService} from './login/login.service';
library.add(fas);



@NgModule({
  declarations: [
    AppComponent,
    InstituicaoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
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

    AccordionModule,
    DataViewModule,
    AutoCompleteModule,
    TabViewModule,

  ],
  providers: [
    InstituicaoService,
    ConfirmationService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

