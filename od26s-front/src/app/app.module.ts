import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { library } from '@fortawesome/fontawesome-svg-core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {InstituicaoService} from './instituicao/instituicao.service';
import {FormsModule} from '@angular/forms';
import {
  AccordionModule,
  AutoCompleteModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  GrowlModule,
  TabViewModule,
  ConfirmationService
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataViewModule} from 'primeng/dataview';
import { AmostraComponent } from './amostra/amostra.component';
import { AmostraService } from './amostra/amostra.service';
import {LoginService} from './login/login.service';
import {HttpClientInterceptor} from './http-client.interceptor';
import {MenuComponent} from './menu/menu.component';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {ProgressSpinnerModule} from 'primeng/primeng';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {ModeloService} from './services/modelo.service';
import {PrecoComponent} from './preco/preco.component';
import {PrecoService} from './preco/preco.service';
import { PessoaService } from './pessoa/pessoa.service';
import { PessoaComponent } from './pessoa/pessoa.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    InstituicaoComponent,
    LoginComponent,
    MenuComponent,
    CadEquipamentoComponent,
    CadastroModeloComponent,
    PrecoComponent,
    PessoaComponent,
    AmostraComponent
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
    DialogModule,
    AccordionModule,
    DataViewModule,
    AutoCompleteModule,
    TabViewModule,
    CKEditorModule,
    DropdownModule,
    CalendarModule,
  ],
  providers: [
    ConfirmationService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
    TableModule,
    AmostraService,
    DialogModule,
    FormsModule,
    BrowserAnimationsModule,
    GrowlModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    ModeloService,
    PrecoService,
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
