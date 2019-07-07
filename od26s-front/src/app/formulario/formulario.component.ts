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


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  private usuarioLogado: Usuario;
  private formularioEdit: Formulario;
  private selectedEquipamento: Equipamento;
  private formStatus: any;
  private naturezaProjeto: any;

  private usuarios: Array<Usuario>;
  private formularios: Array<Formulario>;
  private equipamentos: Array<Equipamento>;
  private formStatusItems: Array<any>;
  private naturezaProjetoItems: Array<any>;
  private msgs: Array<Message>;

  private dialogFormulario = false;
  public editor = ClassicEditorBuild;

  constructor(private formularioService: FormularioService,
              private loginService: LoginService,
              private usuarioService: UsuarioService,
              private equipamentoService: EquipamentoService,
              private modeloService: ModeloService
  ) {
  }

  ngOnInit() {
    this.formStatusItems = [
      {text: '', value: 'A'},
      {text: 'Aprovado', value: 'A'},
      {text: 'Pendente', value: 'P'},
      {text: 'Reprovado', value: 'R'}
    ];

    this.naturezaProjetoItems = [
      {text: '', value: ''},
      {text: 'Iniciação Científica ou Tecnológica (programas PIBIC/PIBIT)', value: 'Iniciacao'},
      {text: 'Trabalho de Conclusão de Curso (TCC)', value: 'TCC'},
      {text: 'Mestrado', value: 'Mestrado'},
      {text: 'Doutorado', value: 'Doutorado'},
      {text: 'Outro', value: 'Outro'},
    ];

    this.selectedEquipamento = new Equipamento();
    this.msgs = [];

    this.initFormulario();
    this.initComponent();
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

  getFormStatusText(status: string): string {
    switch (status) {
      case 'A':
        return 'Aprovado';
      case 'R':
        return 'Reprovado';
      default:
        return 'Pendente';
    }
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
  }

  showDialogFormulario(form: Formulario = null) {
    if (form) {
      this.formularioEdit = JSON.parse(JSON.stringify(form));
      this.naturezaProjeto = this.naturezaProjetoItems.find(np => np.value === this.formularioEdit.naturezaOperacao);
      this.formStatus = this.formStatusItems.find(fs => fs.value === this.formularioEdit.status);
    } else {
      this.initFormulario();
    }

    this.dialogFormulario = true;
  }

  closeDialogFormulario() {
    this.dialogFormulario = false;
    this.initFormulario();
  }

  saveFormulario() {
    this.formularioEdit.naturezaOperacao = this.naturezaProjeto.value;
    this.formularioEdit.status = this.formStatus.value;
    this.formularioEdit.amostra = null;
    this.formularioEdit.quantidadeEnsaios = 0;
    this.formularioEdit.valorTotal = 0;

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
}
