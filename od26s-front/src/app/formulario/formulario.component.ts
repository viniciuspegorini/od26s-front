import {Component, OnInit} from '@angular/core';
import {FormularioService} from '../services/formulario.service';
import {Formulario} from '../model/formulario';
import {LoginService} from '../login/login.service';
import {Usuario} from '../model/usuario';
import {Modelo} from '../model/modelo';
import {Amostra} from '../model/amostra';
import {UsuarioService} from '../usuario/usuario.service';
import {Instituicao} from '../model/instituicao';
import {Equipamento} from '../model/equipamento';
import {EquipamentoService} from '../services/equipamento.service';
import {ModeloService} from '../services/modelo.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import {Message} from "primeng/api";
import {InstituicaoService} from "../services/instituicao.service";


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  private usuarioLogado: Usuario;
  private formularioEdit: Formulario;
  private usuarioEdit: Usuario;
  private selectedEquipamento: Equipamento;
  private formStatus: any;
  private naturezaProjeto: any;
  private selectedUserStatus: any;

  private usuarios: Array<Usuario>;
  private formularios: Array<Formulario>;
  private equipamentos: Array<Equipamento>;
  private formStatusItems: Array<any>;
  private naturezaProjetoItems: Array<any>;
  private tiposPessoa: Array<any>;
  private situacoesCadastro: Array<any>;
  private msgs: Array<Message>;
  private instiuicoes: Array<Instituicao>;
  private orientadores: Array<Usuario>;

  private dialogUsuario = false;
  private dialogFormulario = false;
  public editor = ClassicEditorBuild;

  constructor(private formularioService: FormularioService,
              private loginService: LoginService,
              private usuarioService: UsuarioService,
              private equipamentoService: EquipamentoService,
              private modeloService: ModeloService,
              private instituicaoService: InstituicaoService
  ) {
  }

  ngOnInit() {
    this.formStatusItems = [
      {text: ''},
      {text: 'Aguardando amostra'},
      {text: 'Amostra recebida'},
      {text: 'Recusado'},
      {text: 'Cancelado'},
      {text: 'Em análise'},
      {text: 'Em faturamento'},
      {text: 'Finalizado'},
    ];

    this.naturezaProjetoItems = [
      {text: '', value: ''},
      {text: 'Iniciação Científica ou Tecnológica (programas PIBIC/PIBIT)', value: 'Iniciacao'},
      {text: 'Trabalho de Conclusão de Curso (TCC)', value: 'TCC'},
      {text: 'Mestrado', value: 'Mestrado'},
      {text: 'Doutorado', value: 'Doutorado'},
      {text: 'Outro', value: 'Outro'},
    ];

    this.tiposPessoa = [
      {text: 'Aluno', value: 'Aluno'},
      {text: 'Externo', value: 'Externo'},
      {text: 'Orientador', value: 'Orientador'},
      {text: 'Pesquisador', value: 'Pesquisador'},
    ];

    this.situacoesCadastro = [
      {text: '', value: 'P'},
      {text: 'Aprovado', value: 'A'},
      {text: 'Pendente', value: 'P'},
      {text: 'Reprovado', value: 'R'}
    ];

    this.selectedEquipamento = new Equipamento();
    this.msgs = [];

    this.initUsuario();
    this.initComponent();
    this.initFormulario();
  }

  isAdmin() {
    return this.loginService.hasRole('ADMIN');
  }

  initComponent() {
    this.getLoggedUser()
      .then(() => {
        this.findAllFormularios();
        this.findAllUsuarios();
        this.findAllEquipamentos();
        this.findAllInstituicoes();
      })
      .catch(err => {
        console.error(err);
      });
  }

  findAllFormularios() {
    this.formularioService.findAll().subscribe(formularios => {
      if (this.isAdmin()) {
        this.formularios = formularios;
      } else {
        this.formularios = formularios.filter(f => f.usuario.id === this.usuarioLogado.id);
      }
    });
  }

  findAllUsuarios() {
    if (this.isAdmin()) {
      this.usuarioService.findAll().subscribe(usuarios => {
        this.usuarios = usuarios;
        this.usuarios.unshift(new Usuario());
        this.orientadores = this.usuarios.filter(u => u.tipoPessoa === 'Orientador');
      });
    } else {
      this.usuarios = [this.usuarioLogado];
    }
  }

  findAllEquipamentos() {
    this.equipamentoService.findAll().subscribe(equipamentos => {
      this.equipamentos = equipamentos;
      this.equipamentos.unshift(new Equipamento());
    });
  }

  findAllInstituicoes() {
    this.instituicaoService.findAll().subscribe(instituicoes => {
      this.instiuicoes = instituicoes;
    });
  }

  getLoggedUser(): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      this.formularioService.getLoggedUser().subscribe(usuarioLogado => {
        this.usuarioLogado = usuarioLogado;
        resolve();
      }, error => {
        console.error(error);
        reject();
      });
    });
  }

  setFormModelo() {
    if (this.selectedEquipamento.id) {
      this.modeloService.findEquipamento(this.selectedEquipamento.id).subscribe(modelo => {
        this.formularioEdit.modelo = modelo;
      });
    }
  }

  initFormulario() {
    this.naturezaProjeto = {};
    this.formStatus = {};
    this.formularioEdit = new Formulario();
    this.formularioEdit.modelo = new Modelo();
    this.formularioEdit.usuario = new Usuario();
    this.formularioEdit.amostra = new Amostra();
    this.formularioEdit.usuario.instituicao = new Instituicao();
    this.formularioEdit.modelo.metodologia = '';
    this.formularioEdit.status = 'Em análise';
  }

  initUsuario() {
    this.usuarioEdit = new Usuario();
    this.usuarioEdit.orientador = new Usuario();
    this.usuarioEdit.instituicao = new Instituicao();
    this.usuarioEdit.permissao = [];
  }

  showDialogFormulario(form: Formulario = null) {
    if (form) {
      this.formularioEdit = JSON.parse(JSON.stringify(form));
      this.naturezaProjeto = this.naturezaProjetoItems.find(np => np.value === this.formularioEdit.naturezaOperacao);
      this.formStatus = this.formStatusItems.find(fs => fs.value === this.formularioEdit.status);
      if (!this.naturezaProjeto) {
        this.naturezaProjeto = this.naturezaProjetoItems[this.naturezaProjetoItems.length - 1];
      }
    } else {
      this.initFormulario();
      if (!this.isAdmin()) {
        this.formularioEdit.usuario = JSON.parse(JSON.stringify(this.usuarioLogado));
      }
    }

    this.dialogFormulario = true;
  }

  closeDialogFormulario() {
    this.dialogFormulario = false;
    this.initFormulario();
  }

  saveFormulario() {
    if (this.naturezaProjeto.value !== 'Outro') {
      this.formularioEdit.naturezaOperacao = this.naturezaProjeto.value;
    }

    this.formularioEdit.status = this.formStatus.text;
    this.formularioEdit.amostra = null;
    this.formularioEdit.quantidadeEnsaios = 0;
    this.formularioEdit.valorTotal = 0;

    if (!this.isAdmin()) {
      this.formularioEdit.status = 'Em análise';
    }

    this.formularioService.save(this.formularioEdit).subscribe(() => {
      this.closeDialogFormulario();
      this.initFormulario();
      this.findAllFormularios();
      this.msgs = [{
        severity: 'success', summary: 'Sucesso',
        detail: 'Formulário salvo com sucesso!'
      }];
    }, error => {
      this.msgs = [{
        severity: 'error', summary: 'Falhou',
        detail: 'Falha ao salvar formulário. Tente novamente!'
      }];
    });
  }

  showDialogUsuario(usuario: Usuario) {
    if (this.isAdmin()) {
      if (usuario) {
        this.usuarioEdit = JSON.parse(JSON.stringify(usuario));
        this.selectedUserStatus = this.situacoesCadastro.find(sc => sc.value === this.usuarioEdit.situacaoCadastro);
      }
      this.dialogUsuario = true;
    }
  }

  closeDialogUsuario() {
    this.dialogUsuario = false;
    this.initUsuario();
  }

  saveUsuario() {
    this.usuarioEdit.situacaoCadastro = this.selectedUserStatus.value;

    this.usuarioService.save(this.usuarioEdit).subscribe(() => {
      this.closeDialogUsuario();
      this.initUsuario();
      this.findAllFormularios();

      this.msgs = [{
        severity: 'success', summary: 'Sucesso',
        detail: 'Usuário salvo com sucesso!'
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
