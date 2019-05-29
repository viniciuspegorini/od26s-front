import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaComponent } from './pessoa/pessoa.component';
import {FormularioComponent} from "./formulario/formulario.component";

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'pessoa', component: PessoaComponent},
  {path: 'formulario', component: FormularioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
