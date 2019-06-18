import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
  DialogModule, DropdownModule, TabViewModule
} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './login/login.component';
import {DataViewModule} from 'primeng/dataview';
import {LoginService} from './login/login.service';
import {HttpClientInterceptor} from './http-client.interceptor';
import {MenuComponent} from './menu/menu.component';
library.add(fas);
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {ProgressSpinnerModule} from 'primeng/primeng';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {ModeloService} from './services/modelo.service';
import {PrecoComponent} from './preco/preco.component';
import {PrecoService} from './preco/preco.service';
import { PessoaService } from './pessoa/pessoa.service';
import { PessoaComponent } from './pessoa/pessoa.component';
import {FormularioService} from './formulario/formulario.service';
import {FormularioComponent} from './formulario/formulario.component';


@NgModule({
  declarations: [
    AppComponent,
    InstituicaoComponent,
    LoginComponent,
    MenuComponent,
    FormularioComponent,
    CadEquipamentoComponent,
    CadastroModeloComponent,
    PrecoComponent,
    PessoaComponent
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
    CKEditorModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule
  ],
  providers: [
    InstituicaoService,
    ConfirmationService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
    TableModule,
    FontAwesomeModule,
    DialogModule,
    FormsModule,
    BrowserAnimationsModule,
    GrowlModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    ModeloService,
    PrecoService,
    PessoaService,
    FormularioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
