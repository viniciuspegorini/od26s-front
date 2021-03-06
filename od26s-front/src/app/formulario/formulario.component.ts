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
import {Message} from 'primeng/api';
import {InstituicaoService} from '../services/instituicao.service';
import {AmostraService} from '../services/amostra.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public editor = ClassicEditorBuild;

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
  private amostras: Array<Amostra>;
  private amostrasUsuario: Array<Amostra>;
  private formStatusItems: Array<any>;
  private naturezaProjetoItems: Array<any>;
  private tiposPessoa: Array<any>;
  private situacoesCadastro: Array<any>;
  private msgs: Array<Message>;
  private instiuicoes: Array<Instituicao>;
  private orientadores: Array<Usuario>;

  private dialogAmostra = false;
  private dialogUsuario = false;
  private dialogFormulario = false;

  constructor(private formularioService: FormularioService,
              private loginService: LoginService,
              private usuarioService: UsuarioService,
              private equipamentoService: EquipamentoService,
              private modeloService: ModeloService,
              private instituicaoService: InstituicaoService,
              private amostraService: AmostraService
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
        this.findAllAmostras();
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

  findAllAmostras() {
    if (this.isAdmin()) {
      this.amostraService.findAll().subscribe(amostras => {
        this.amostras = amostras;
      });
    }
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
      let selectedId = this.selectedEquipamento.id;

      if (
        !this.formularioEdit.modelo.id ||
        (!!this.formularioEdit.modelo && this.formularioEdit.modelo.preco && selectedId !== this.formularioEdit.modelo.preco.equipamento.id)
      ) {
        this.modeloService.findEquipamento(this.selectedEquipamento.id).subscribe(modelo => {
          this.formularioEdit.metodologia = modelo.metodologia;
          this.formularioEdit.modelo = modelo;
        });
      }
    }
  }

  initFormulario() {
    this.naturezaProjeto = {};
    this.formStatus = {text: 'Em análise'};
    this.formularioEdit = new Formulario();
    this.formularioEdit.metodologia = '';
    this.formularioEdit.modelo = new Modelo();
    this.formularioEdit.usuario = new Usuario();
    this.formularioEdit.usuario.orientador = new Usuario();
    this.formularioEdit.amostra = new Amostra();
    this.formularioEdit.usuario.instituicao = new Instituicao();
    this.formularioEdit.status = 'Em análise';
  }

  initUsuario() {
    this.usuarioEdit = new Usuario();
    this.usuarioEdit.orientador = new Usuario();
    this.usuarioEdit.instituicao = new Instituicao();
    this.usuarioEdit.permissoes = [];
  }

  showDialogFormulario(form: Formulario = null) {
    if (form) {
      this.formularioEdit = JSON.parse(JSON.stringify(form));
      this.naturezaProjeto = this.naturezaProjetoItems.find(np => np.value === this.formularioEdit.naturezaOperacao);
      this.formStatus = this.formStatusItems.find(fs => fs.text === this.formularioEdit.status);

      if (this.formularioEdit.modelo) {
        this.selectedEquipamento = this.equipamentos.find(eq => {
          return eq.id === this.formularioEdit.modelo.preco.equipamento.id;
        });
      }

      if (!this.formStatus) {
        this.formStatus = {text: 'Em análise'};
      }

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
    this.selectedEquipamento = new Equipamento();
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

        if (!this.usuarioEdit.orientador) {
          this.usuarioEdit.orientador = new Usuario();
        }

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

  showDialogAmostra(form: Formulario) {
    if (form && this.isAdmin()) {
      this.formularioEdit = JSON.parse(JSON.stringify(form));
      this.amostrasUsuario = this.amostras.filter(a => a.usuario && a.usuario.id === this.formularioEdit.usuario.id);
      this.amostrasUsuario.unshift(new Amostra());
      this.dialogAmostra = true;
    }
  }

  closeDialogAmostra() {
    this.dialogAmostra = false;
    this.amostrasUsuario = [];
  }

  saveAmostra() {
    if (this.formularioEdit.amostra && this.formularioEdit.amostra.id) {
      this.formularioEdit.status = 'Amostra recebida';
    }

    this.formularioService.save(this.formularioEdit).subscribe(() => {
      this.closeDialogAmostra();
      this.findAllFormularios();
      this.msgs = [{
        severity: 'success', summary: 'Sucesso',
        detail: 'Amostra vinculada com sucesso!'
      }];
    }, error => {
      console.error(error);
      this.msgs = [{
        severity: 'error', summary: 'Falhou',
        detail: 'Falha ao vincular amostra. Tente novamente!'
      }];
    });
  }
}
