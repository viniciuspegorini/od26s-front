import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginService} from './login/login.service';
import {LoginComponent} from './login/login.component';
import {InstituicaoComponent} from './instituicao/instituicao.component';
import {CadEquipamentoComponent} from './cad-equipamento/cad-equipamento.component';
import {CadastroModeloComponent} from './cadastro-modelo/cadastro-modelo.component';
import {PrecoComponent} from './preco/preco.component';
import {AmostraComponent} from './amostra/amostra.component';
import { PermissaoComponent } from './permissao/permissao.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import {FormularioComponent} from './formulario/formulario.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {AuthGuard} from './auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', canActivate: [LoginService], children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'instituicao', component: InstituicaoComponent},
      
      {
        path: 'equipamento',
        component: CadEquipamentoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      
    
      {
        path: 'modelo',
        component: CadastroModeloComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      
      
      {
        path: 'preco',
        component: PrecoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },


      {
        path: 'amostra',
        component: AmostraComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_RECEPCIONISTA'] }
      },

      {
        path: 'permissao',
        component: PermissaoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },


      {
        path: 'formulario',
        component: FormularioComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_RECEPCIONISTA','ROLE_SOLICITANTE'] }
      },


      {path: 'usuario', component: UsuarioComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
