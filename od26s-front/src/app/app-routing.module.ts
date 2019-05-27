import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {InstituicaoComponent} from './instituicao/instituicao.component';

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'equipamento', component: CadEquipamentoComponent },
  {path: 'instituicao', component: InstituicaoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
