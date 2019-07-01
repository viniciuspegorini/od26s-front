import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {FormularioService} from '../services/formulario.service';
import {Formulario} from '../model/formulario';
import {Usuario} from "../model/usuario";
import {UsuarioService} from "../services/usuario.service";
import {Message} from "primeng/api";
import {InstituicaoService} from "../services/instituicao.service";
import {Instituicao} from "../model/instituicao";
import {AmostraService} from "../services/amostra.service";
import {Amostra} from "../model/amostra";

@Component({
  selector: 'app-lista-formularios',
  templateUrl: './lista-formularios.component.html',
  styleUrls: ['./lista-formularios.component.css']
})
export class ListaFormulariosComponent implements OnInit {

  msgs: Message[] = [];
  private formularios: Array<Formulario>;
  private instituicoes: Array<Instituicao>;
  private orientadores: Array<Usuario>;
  private amostras: Array<Amostra>;
  private totalRecords: number;
  private showUserDialog = false;
  private showAmostraDialog = false;
  private usuarioEdit: Usuario;
  private formEdit: Formulario;

  constructor(private loginService: LoginService,
              private formularioService: FormularioService,
              private usuarioService: UsuarioService,
              private instituicaoService: InstituicaoService,
              private amostraService: AmostraService) {
  }

  ngOnInit() {
    if (this.isAdmin()) {
      this.findAllForms();
      this.findAllInstituicoes();
      this.findAllOrientadores();
    }

    this.usuarioEdit = new Usuario();
    this.formEdit = new Formulario();
  }

  isAdmin(): boolean {
    return this.loginService.hasRole('ADMIN');
  }

  findAllForms() {
    if (this.isAdmin()) {
      this.formularioService.findAll().subscribe(formularios => {
        console.log(formularios);
        this.formularios = formularios;
        this.totalRecords = formularios.length;
      });
    }
  }

  findAllInstituicoes() {
    this.instituicaoService.findAll().subscribe(instituicoes => {
      this.instituicoes = instituicoes;
    });
  }

  findAllOrientadores() {
    this.usuarioService.findOrientadores().subscribe(orientadores => {
      this.orientadores = orientadores;
    });
  }

  findAllAmostrasByUser(userId: number) {
    this.amostraService.findAll().subscribe(amostras => {
      this.amostras = amostras.filter(a => a.usuario.id === userId);
      this.amostras.unshift(new Amostra());
    });
  }

  userDialog(user: Usuario) {
    if (this.isAdmin()) {
      this.usuarioEdit = JSON.parse(JSON.stringify(user));
      this.showUserDialog = true;
    }
  }

  closeUserDialog() {
    this.showUserDialog = false;
    this.usuarioEdit = new Usuario();
  }

  saveUser() {
    if (this.isAdmin()) {
      this.usuarioService.save(this.usuarioEdit).subscribe(() => {
        this.msgs = [{
          severity: 'success', summary: 'Confirmado',
          detail: 'Usuário atualizado com sucesso!'
        }];
      }, error => {
        console.error(error);
        this.msgs = [{
          severity: 'error', summary: 'Falhou',
          detail: 'Falha ao salvar usuário. Tente novamente!'
        }];
      });
    }
  }

  amostraDialog(form: Formulario) {
    this.findAllAmostrasByUser(form.usuario.id);
    this.formEdit = JSON.parse(JSON.stringify(form));
    if (!this.formEdit.amostra) {
      this.formEdit.amostra = new Amostra();
    }

    this.showAmostraDialog = true;
  }

  setFormAmostra() {
    if (this.formEdit.amostra.id) {
      this.formularioService.save(this.formEdit).subscribe(() => {
        this.showAmostraDialog = false;
        this.msgs = [{
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Amostra vinculada com sucesso'
        }];
        this.findAllForms();
        this.formEdit = new Formulario();
        this.formEdit.amostra = new Amostra();
      }, error => {
        this.msgs = [{
          severity: 'error',
          summary: 'Falhou',
          detail: 'Falha ao vincular amostra'
        }];
      });
    }
  }
}
