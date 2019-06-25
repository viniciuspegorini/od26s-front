import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../model/usuario';
import { InstituicaoService } from '../services/instituicao.service';
import { Instituicao } from '../model/instituicao';
import { Permissao } from '../model/permissao';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  usuario: Usuario;
  usuarios: Array<Usuario>;
  permissoes: Array<Permissao>;
  instituicoes: Array<Instituicao>;

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.initUsuario();
    this.findAllUsuarios();
    this.findAllInstituicoes();
  }

  initUsuario() {
    this.usuario = new Usuario();
    this.usuario.orientador = new Usuario();
    this.usuario.permissao = [{ id: 2, nome: 'ROLE_SOLICITANTE' }];
  }

  findAllUsuarios() {
    this.usuarioService.findAll().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  findAllInstituicoes() {
    this.instituicaoService.findAll().subscribe(instituicoes => {
      this.instituicoes = instituicoes;
    });
  }

  backPage() {
    window.history.back();
  }
}
