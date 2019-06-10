import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {PrecoComponent} from './preco/preco.component';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {LoginComponent} from './login/login.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import {FormsUsuarioExternoComponent} from "./forms-usuario-externo/forms-usuario-externo.component";
import {FormsManagerComponent} from "./forms-manager/forms-manager.component";

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'modelo', component: CadastroModeloComponent},
  {path: 'equipamento', component: CadEquipamentoComponent},
  {path: 'preco', component: PrecoComponent},
  {path: 'instituicao', component: InstituicaoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pessoa', component: PessoaComponent},
  {path: 'forms', component: FormsManagerComponent},
  {path: 'forms/:id', component: FormsUsuarioExternoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
