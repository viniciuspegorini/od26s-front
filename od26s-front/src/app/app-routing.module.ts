import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';

const routes: Routes = [
  {path: 'equipamento', component: CadEquipamentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
