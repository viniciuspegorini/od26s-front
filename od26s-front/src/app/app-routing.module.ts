import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {PrecoComponent} from './preco/preco.component';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {LoginComponent} from './login/login.component';
import {CadServicosComponent} from './cad-servicos/cad-servicos.component';
import { PessoaComponent } from './pessoa/pessoa.component';

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'modelo', component: CadastroModeloComponent},
  {path: 'equipamento', component: CadEquipamentoComponent},
  {path: 'preco', component: PrecoComponent},
  {path: 'instituicao', component: InstituicaoComponent},
  {path: 'servicos', component: CadServicosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pessoa', component: PessoaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
