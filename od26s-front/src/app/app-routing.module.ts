import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'instituicao', pathMatch: 'full'},
  {path: 'instituicao', component: InstituicaoComponent},
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
