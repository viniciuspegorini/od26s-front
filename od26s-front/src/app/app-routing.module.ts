import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'modelo', component: CadastroModeloComponent},
  {path: 'equipamento', component: CadEquipamentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
