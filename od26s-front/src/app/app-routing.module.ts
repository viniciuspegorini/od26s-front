import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrecoComponent} from "./preco/preco.component";

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'preco', component: PrecoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
