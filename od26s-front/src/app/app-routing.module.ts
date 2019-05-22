import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstituicaoComponent} from './instituicao/instituicao.component';

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'instituicao', component: InstituicaoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
