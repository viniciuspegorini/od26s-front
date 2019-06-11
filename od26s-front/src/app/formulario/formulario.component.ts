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
  msgs: Message[] = [];
  selectedValue: string;
  amostras: Amostra[];
  modelos: Modelo[];
  equipamentos: Equipamento[];
  servicos: Servico[];
  pessoas: Pessoa[];
  notas: Nota[];

  constructor(private formularioService: FormularioService, private confirmationService: ConfirmationService,
              private pessoaService: PessoaService, private notaService: NotaService,
              private modeloService: ModeloService, private loginService: LoginService,
              private equipamentoService: EquipamentoService
  ) {
  }

  ngOnInit() {
    this.formularioEdit = new Formulario();
    this.carregarCombos();
    // if ( ! this.hasRole('ADMIN') ) {
    //   // carrega o this.formularioEdit.pessoa
    //
    // } else {
    //   this.pessoaService.findAll().subscribe(e => {
    //     this.pessoas = e;
    //     this.formularioEdit.pessoa = this.pessoas[0];
    //   });
    // }
  }

  hasRole(permissao: string) {
    this.loginService.hasRole(permissao);
  }

  carregarCombos() {
    this.modeloService.findAll().subscribe(e => {
      this.modelos = e;
    });
    this.equipamentoService.findAll().subscribe(e => {
      this.equipamentos = e;
    });
  }

  newEntity() {
    this.showDialog = true;
    //   this.formularioEdit = new Formulario();
    //   this.formularioEdit.pessoa = this.pessoas[0];
    //   this.formularioEdit.modelo = this.modelos[0];
    this.formularioEdit.modelo.preco.equipamento = this.equipamentos[0];
  }

  cancel() {
    this.showDialog = false;
    this.formularioEdit = new Formulario();
  }

  save() {
    this.formularioService.save(this.formularioEdit).subscribe(e => {
        this.formularioEdit = new Formulario();
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
      if (this.selectedValue !== 'Outro') {
        this.formularioEdit.naturezaOperacao = this.selectedValue;
      } else {
        this.formularioEdit.naturezaOperacao = '';
      }
    }
  }
}
