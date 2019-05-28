import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {LoginService} from './login/login.service';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', canActivate: [LoginService], children: [
      {path: 'modelo', component: CadastroModeloComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
