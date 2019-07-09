import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {FormsModule} from '@angular/forms';
import {
  AccordionModule,
  AutoCompleteModule,
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  GrowlModule,
  InputTextModule,
  PanelMenuModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  SidebarModule,
  SplitButtonModule,
  TabViewModule,
  TooltipModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataViewModule} from 'primeng/dataview';
import {AmostraComponent} from './amostra/amostra.component';
import {AmostraService} from './services/amostra.service';
import {LoginService} from './login/login.service';
import {HttpClientInterceptor} from './http-client.interceptor';
import {MenuComponent} from './menu/menu.component';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {ModeloService} from './services/modelo.service';
import {PrecoComponent} from './preco/preco.component';
import {PrecoService} from './services/preco.service';
import {LoginComponent} from './login/login.component';
import {InputMaskModule} from 'primeng/inputmask';
import {PermissaoService} from './services/permissao.service';
import {PermissaoComponent} from './permissao/permissao.component';
import {RegistroUsuarioComponent} from './registro-usuario/registro-usuario.component';
import {FormularioComponent} from './formulario/formulario.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {UsuarioService} from './services/usuario.service';
import {ResultadoComponent} from './resultado/resultado.component';


@NgModule({
  declarations: [
    AppComponent,
    InstituicaoComponent,
    LoginComponent,
    MenuComponent,
    CadEquipamentoComponent,
    CadastroModeloComponent,
    PrecoComponent,
    AmostraComponent,
    PermissaoComponent,
    RegistroUsuarioComponent,
    FormularioComponent,
    UsuarioComponent,
    ResultadoComponent
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
    InputMaskModule,
    RadioButtonModule,
    SplitButtonModule,
    TooltipModule,
    InputTextModule,
    SidebarModule,
    PanelMenuModule,
    FileUploadModule
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
    PermissaoService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
