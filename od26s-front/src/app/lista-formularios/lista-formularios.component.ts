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
import {Modelo} from "../model/modelo";
import {ModeloService} from "../services/modelo.service";

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
  private modelos: Array<Modelo>;
  private amostras: Array<Amostra>;
  private filteredAmostras: Array<Amostra>;
  private totalRecords: number;
  private userDialog = false;
  private amostraDialog = false;
  private usuarioEdit: Usuario;
  private formEdit: Formulario;
  private tipoPessoa = [
    {label: 'Aluno', value: 'Aluno'},
    {label: 'Externo', value: 'Externo'},
    {label: 'Orientador', value: 'Orientador'},
    {label: 'Pesquisador', value: 'Pesquisador'},
  ];

  constructor(private loginService: LoginService,
              private formularioService: FormularioService,
              private usuarioService: UsuarioService,
              private instituicaoService: InstituicaoService,
              private amostraService: AmostraService,
              private modeloService: ModeloService) {
  }

  ngOnInit() {
    this.usuarioEdit = new Usuario();
    this.formEdit = new Formulario();

    if (this.isAdmin()) {
      this.findAllForms();
      this.findAllOrientadores();
      this.findAllInstituicoes();
      this.findAllAmostras();
    }

    this.findAllModelos();
  }

  isAdmin(): boolean {
    return this.loginService.hasRole('ADMIN');
  }

  // BUSCA DE DADOS
  findAllForms() {
    if (this.isAdmin()) {
      this.formularioService.findAll().subscribe(formularios => {
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

  findAllModelos() {
    this.modeloService.findAll().subscribe(modelos => {
      this.modelos = modelos;
    });
  }

  findAllAmostras() {
    this.amostraService.findAll().subscribe(amostras => {
      this.amostras = amostras;
    });
  }

  // VALIDAÇÃO DE USUÁRIOS
  showUserDialog(user: Usuario) {
    this.usuarioEdit = JSON.parse(JSON.stringify(user));
    this.userDialog = true;
  }

  closeUserDialog() {
    this.userDialog = false;
    this.formEdit = new Formulario();
    this.formEdit.usuario = new Usuario();
    this.formEdit.modelo = new Modelo();
  }

  saveUser(isValid: boolean) {
    this.usuarioService.save(this.usuarioEdit).subscribe(() => {
      this.findAllForms();
      this.closeUserDialog();
      this.msgs = [{
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Cadastro de usuário salvo com sucesso!'
      }];
    }, error => {
      console.error(error);
      this.msgs = [{
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao salvar cadastro de usuário!'
      }];
    });
  }

  // VINCULAÇÃO DE AMOSTRAS
  showDialogAmostra(form: Formulario) {
    this.formEdit = JSON.parse(JSON.stringify(form));
    this.filteredAmostras = this.amostras.filter(a => a.usuario.id === this.formEdit.usuario.id);
    this.amostraDialog = true;
  }

  closeDialogAmostra() {
    this.amostraDialog = false;
    this.filteredAmostras = [];
    this.formEdit = new Formulario();
    this.formEdit.usuario = new Usuario();
    this.formEdit.modelo = new Modelo();
    this.formEdit.amostra = new Amostra();
  }

  saveAmostra() {
    this.formularioService.save(this.formEdit).subscribe(() => {
      this.findAllForms();
      this.closeDialogAmostra();
      this.msgs = [{
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Amostra vinculada com sucesso!'
      }];
    }, error => {
      console.error(error);
      this.msgs = [{
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao vincular amostra!'
      }];
    });
  }
}
