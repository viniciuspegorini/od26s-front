import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {FormsModule} from '@angular/forms';
import {ModeloService} from './services/modelo.service';
import {ConfirmationService} from 'primeng/api';
import {
  AccordionModule,
  AutoCompleteModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  GrowlModule,
  TabViewModule,
  PanelModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataViewModule} from 'primeng/dataview';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {EquipamentoService} from './cad-equipamento/equipamento.service';
import {PrecoComponent} from './preco/preco.component';
import {PrecoService} from './preco/preco.service';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {InstituicaoService} from './instituicao/instituicao.service';
import {LoginService} from './login/login.service';
import { LoginComponent } from './login/login.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { PessoaService } from './pessoa/pessoa.service';
import { FormsUsuarioExternoComponent } from './forms-usuario-externo/forms-usuario-externo.component';
import { FormsManagerComponent } from './forms-manager/forms-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroModeloComponent,
    CadEquipamentoComponent,
    PrecoComponent,
    InstituicaoComponent,
    LoginComponent,
    PessoaComponent,
    FormsUsuarioExternoComponent,
    FormsManagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AccordionModule,
    GrowlModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule,
    TableModule,
    DataViewModule,
    AutoCompleteModule,
    TabViewModule,
    CKEditorModule,
    DropdownModule,
    PanelModule
  ],
  providers: [
    ConfirmationService,
    ModeloService,
    EquipamentoService,
    PrecoService,
    InstituicaoService,
    LoginService,
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
