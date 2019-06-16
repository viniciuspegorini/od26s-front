import {Component, OnInit, ViewChild} from '@angular/core';
import {FormularioService} from './formulario.service';
import {ConfirmationService, Message} from 'primeng/api';
import {PessoaService} from '../pessoa/pessoa.service';
import {Pessoa} from '../model/pessoa';
import {Amostra} from '../model/amostra';
import {Modelo} from '../model/modelo';
import {Servico} from '../model/servico';
import {Nota} from '../model/nota';
import {Formulario} from '../model/formulario';
import {DataTable} from 'primeng/primeng';
import {NotaService} from './nota.service';
import {ModeloService} from '../services/modelo.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-angular';
import {LoginService} from '../login/login.service';
import {EquipamentoService} from '../cad-equipamento/equipamento.service';
import {Equipamento} from '../model/equipamento';
import {Usuario} from '../model/usuario';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public editor = ClassicEditorBuild;

  @ViewChild('dt') dataTable: DataTable;

  formularioEdit = new Formulario();
  showDialog = false;
  equipamentoSelected = new Equipamento();
  // orientadorEdit = new Pessoa;
  modeloEdit = new Modelo();
  msgs: Message[] = [];
  selectedValue: string;
  amostras: Amostra[];
  modelos: Modelo[];
  equipamentos: Equipamento[];
  servicos: Servico[];
  pessoas: Pessoa[] = [];
  notas: Nota[];
  usuario: Usuario;
  pessoa: Pessoa;

  constructor(private formularioService: FormularioService, private confirmationService: ConfirmationService,
              private pessoaService: PessoaService, private notaService: NotaService,
              private modeloService: ModeloService, private loginService: LoginService,
              private equipamentoService: EquipamentoService
  ) {
  }

  ngOnInit() {
    this.pessoas = [];
    this.formularioEdit = new Formulario();
    this.formularioEdit.pessoa = new Pessoa();
    this.formularioEdit.modelo = new Modelo();
   // this.equipamentoSelected = new Equipamento();
    this.carregaUsuario();
  }

  carregaUsuario() {
    this.formularioService.getLoggedUser().subscribe(e => {
      this.usuario = e;
      this.formularioEdit = new Formulario();
      this.formularioEdit.pessoa = new Pessoa();
      this.carregarCombos();
      this.modeloEdit = new Modelo();
      if (this.hasRole('ADMIN')) {
        // carrega o this.formularioEdit.pessoa
        // this.carregaUsuario();
        this.pessoaService.findAll().subscribe(e => {
          this.pessoas = e;
          console.log(this.pessoas);
          this.formularioEdit.pessoa = this.pessoas[0];
          // this.orientadorEdit = this.formularioEdit.pessoa.pessoa;
          console.log(this.formularioEdit);
        });
      } else {
        this.carregaUsuario();
        this.formularioService.findByUsuarioId(this.usuario.id);
        // console.log(this.usuario.id);
      }
    });
  }

  hasRole(permissao: string) {
    return this.loginService.hasRole(permissao);
  }

  carregarCombos() {
    this.modeloService.findAll().subscribe(e => {
      this.modelos = e;
    });
    this.equipamentoService.findAll().subscribe(e => {
      this.equipamentos = e;
      this.equipamentoSelected = this.equipamentos[0];
    });
  }

  newEntity() {
    this.showDialog = true;
    //   this.formularioEdit = new Formulario();
    //   this.formularioEdit.pessoa = this.pessoas[0];
    //   this.formularioEdit.modelo = this.modelos[0];

  }

  cancel() {
    this.showDialog = false;
    this.formularioEdit = new Formulario();
  }

  save() {
    this.formularioService.save(this.formularioEdit).subscribe(e => {
        this.formularioEdit = new Formulario();
        this.formularioEdit.status = 'Solicitado';
        this.dataTable.reset();
        this.showDialog = false;
        this.msgs = [{
          severity: 'sucess', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'
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
