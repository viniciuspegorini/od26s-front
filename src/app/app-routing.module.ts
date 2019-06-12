import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginService} from './login/login.service';
import {LoginComponent} from './login/login.component';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {PrecoComponent} from './preco/preco.component';
import { PessoaComponent } from './pessoa/pessoa.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', canActivate: [LoginService], children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'instituicao', component: InstituicaoComponent},
      {path: 'equipamento', component: CadEquipamentoComponent},
      {path: 'modelo', component: CadastroModeloComponent},
      {path: 'preco', component: PrecoComponent},
      {path: 'pessoa', component: PessoaComponent}
    ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
