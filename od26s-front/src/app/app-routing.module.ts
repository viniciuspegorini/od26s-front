import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {PrecoComponent} from './preco/preco.component';

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'modelo', component: CadastroModeloComponent},
  {path: 'equipamento', component: CadEquipamentoComponent},
  {path: 'preco', component: PrecoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
