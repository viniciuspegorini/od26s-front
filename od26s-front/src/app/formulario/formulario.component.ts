import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Message} from 'primeng/api';
import {Amostra} from '../model/amostra';
import {Modelo} from '../model/modelo';
import {Nota} from '../model/nota';
import {Formulario} from '../model/formulario';
import {DataTable} from 'primeng/primeng';
import {NotaService} from '../services/nota.service';
import {ModeloService} from '../services/modelo.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import {LoginService} from '../login/login.service';
import {Equipamento} from '../model/equipamento';
import {Usuario} from '../model/usuario';
import {UsuarioService} from '../usuario/usuario.service';
import {EquipamentoService} from '../services/equipamento.service';
import {FormularioService} from '../services/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public editor = ClassicEditorBuild;

  @ViewChild('dt') dataTable: DataTable;

  msgs: Message[] = [];
  formularioEdit = new Formulario();
  showDialog = false;
  equipamentoSelected = new Equipamento();
  modeloEdit = new Modelo();
  selectedValue: string;
  amostras: Amostra[];
  modelos: Modelo[];
  modelo = new Modelo();
  equipamentos: Equipamento[];
  usuarios: Usuario[] = [];
  notas: Nota[];
  usuario = new Usuario();
  showDialogFormulario = false;

  constructor(private formularioService: FormularioService,
              private confirmationService: ConfirmationService,
              private notaService: NotaService,
              private usuarioService: UsuarioService,
              private modeloService: ModeloService,
              private loginService: LoginService,
              private equipamentoService: EquipamentoService
  ) {
  }

  ngOnInit() {
    this.usuarios = [];
    this.formularioEdit = new Formulario();
    this.formularioEdit.usuario = this.usuario;
    this.carregaUsuario();
  }

  openFormulario() {
    this.showDialogFormulario = true;
    this.selectedValue = 'Iniciacao';
    this.formularioEdit.naturezaOperacao = this.selectedValue;
  }

  closeFormulario() {
    this.showDialogFormulario = false;
    this.formularioEdit = new Formulario();
  //  this.formularioEdit.modelo = new Modelo();
  }

  carregaUsuario() {
    this.formularioService.getLoggedUser().subscribe(e => {
      this.usuario = e;
      this.carregarCombos();
      this.modeloEdit = new Modelo();
      if (this.hasRole('ADMIN')) {
        this.usuarioService.findAll().subscribe(p => {
          this.usuarios = p;
          this.formularioEdit.usuario = this.usuarios[0];
        });
      } else {
        this.formularioService.findByUsuarioId(this.usuario.id).subscribe(user => {
          this.formularioEdit.usuario = user;
          this.formularioEdit.usuario = this.usuario;
        });
      }
    });
  }

  hasRole(permissao: string) {
    return this.loginService.hasRole(permissao);
  }

  carregarCombos() {
    this.modeloService.findAll().subscribe(e => {
      this.modelos = e;
      this.modeloEdit = this.modelos[0];
    });
    this.equipamentoService.findAll().subscribe(e => {
      this.equipamentos = e;
      this.equipamentoSelected = this.equipamentos[0];
    });
  }

  newEntity() {
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
    this.formularioEdit = new Formulario();
  }

  save() {
    this.formularioEdit.status = 'Solicitado';

    if (this.hasRole('ADMIN')) {
      this.formularioEdit.usuario = this.usuarios[0];
    }

    this.formularioEdit.modelo = this.modeloEdit;
    this.formularioEdit.metodologia = this.modeloEdit.metodologia;
    this.formularioEdit.amostra = null;
   // this.formularioEdit.departamento = '';
    this.formularioEdit.nota = null;
    this.formularioEdit.quantidadeEnsaios = 0;
    this.formularioEdit.valorTotal = 0;

    this.formularioService.save(this.formularioEdit).subscribe(e => {
        this.showDialogFormulario = false;
        if (this.hasRole('ADMIN')) {
          this.formularioEdit = new Formulario();
          this.formularioEdit.usuario = new Usuario();
        }
        this.formularioEdit.modelo = new Modelo();
        this.msgs = [{
          severity: 'success', summary: 'Confirmado',
          detail: 'Formulário salvo com sucesso!'
        }];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar  registro!'}];
      }
    );

  }

  onSelectionType(event) {
    if (event) {
      if (this.selectedValue) {
        this.formularioEdit.naturezaOperacao = this.selectedValue;
      } else {
        this.formularioEdit.naturezaOperacao = '';
      }
    }
  }

  selectModelo() {
    if (this.equipamentoSelected) {
      this.modeloService.findEquipamento(this.equipamentoSelected.id).subscribe(e => this.modeloEdit = e);
    }
  }
}
