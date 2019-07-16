import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ConfirmationService, Message } from 'primeng/api';
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
  msgs: Array<Message>;
  tiposPessoa: Array<any>;
  orientadores: Array<Usuario>;
  permissoes: Array<Permissao>;
  instituicoes: Array<Instituicao>;

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {   
    localStorage.clear(); 
    this.initUsuario();
    this.findOrientadores();
    this.findAllInstituicoes();

    this.tiposPessoa = [
      { text: '', value: 'externo' },
      { text: 'Aluno', value: 'aluno' },
      { text: 'Orientador', value: 'orientador' },
      { text: 'Pesquisador', value: 'pesquisador' },
    ];
  }

  initUsuario() {
    this.usuario = new Usuario();
    this.usuario.orientador = new Usuario();
    this.usuario.instituicao = new Instituicao();
    this.usuario.permissoes = [{ id: 2, nome: 'ROLE_SOLICITANTE' }];
  }

  findOrientadores() {
    this.usuarioService.findOrientadores().subscribe(orientadores => {
      this.orientadores = orientadores;
      this.orientadores.unshift(new Usuario());
    });
  }

  findAllInstituicoes() {
    this.instituicaoService.findAll().subscribe(instituicoes => {
      this.instituicoes = instituicoes;
      this.instituicoes.unshift(new Instituicao());
    });
  }

  backPage() {
    location.replace('/login');
  }

  removeNonDigit(value: string) {
    return value.replace(/\D+/g, '');
  }

  save() {
    let usuario = JSON.parse(JSON.stringify(this.usuario));

    if (!usuario.instituicao.nomeFantasia)
      delete usuario.instituicao;

    if (!usuario.orientador.nome)
      delete usuario.orientador;

    if (!usuario.tipoPessoa)
      usuario.tipoPessoa = 'externo';
    else
      usuario.tipoPessoa = usuario.tipoPessoa.value;

    usuario.saldo = 0;
    usuario.status = 'ativo';
    usuario.dtCriacao = new Date();
    usuario.rg = this.removeNonDigit(usuario.rg);
    usuario.cpfCnpj = this.removeNonDigit(usuario.cpfCnpj);
    usuario.celular = this.removeNonDigit(usuario.celular);
    usuario.telefone = this.removeNonDigit(usuario.telefone);

    this.usuarioService.save(usuario).subscribe(() => {
      this.msgs = [{
        severity: 'success',  
        summary: 'Confirmado',
        detail: 'Cadastro realizado com sucesso!'
      }];
      this.backPage();
    }, error => {
      this.msgs = [{
        severity: 'error',
        summary: 'Falhou',
        detail: 'Falha ao realizar cadastro. Tente novamente!'
      }];
    });
  }
}
