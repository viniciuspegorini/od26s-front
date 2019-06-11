import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginService} from './login/login.service';
import {LoginComponent} from './login/login.component';
import {InstituicaoComponent} from './instituicao/instituicao.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', canActivate: [LoginService], children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'instituicao', component: InstituicaoComponent}
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
