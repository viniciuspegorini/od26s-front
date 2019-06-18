import {Component, OnInit, ViewChild} from '@angular/core';
import {Pessoa} from '../model/pessoa';
import {ConfirmationService, LazyLoadEvent, Message, SelectItem} from 'primeng/api';
import {PessoaService} from './pessoa.service';
import {Usuario} from '../model/usuario';
import {Instituicao} from '../model/instituicao';
import {DataTable} from 'primeng/components/datatable/datatable';
import {InstituicaoService} from '../services/instituicao.service';
import {UsuarioService} from '../services/usuario.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})


export class PessoaComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  show = true;
  totalRecords = 10;
  pessoas: Pessoa[];
  pessoaEdit: Pessoa;
  showDialog = false;

  msgs: Message[] = [];
  instituicoes: Instituicao[];
  usuarios: Usuario[];

  tipoPessoa: any;
  status: any;
  tipoPessoa1: any[];
  status1: SelectItem[];
  tipoPess: string;
  tipoStatus: string;

  constructor(private pessoaService: PessoaService, private confirmationService: ConfirmationService,
              private instituicaoService: InstituicaoService, private usuarioService: UsuarioService
  ) {
    this.status1 = [
      {label: 'Ativo', value: 'Ativo'},
      {label: 'Inativo', value: 'Inativo'}
    ];

    this.tipoPessoa1 = [
      {label: 'Aluno', value: 'Aluno'},
      {label: 'Externo', value: 'Externo'},
      {label: 'Orientador', value: 'Orientador'},
      {label: 'Pesquisador', value: 'Pesquisador'},
    ];
  }

  ngOnInit() {
    this.pessoaEdit = new Pessoa();
    this.carregarCombos();
    this.findAll();
  }

  carregarCombos() {
    this.instituicaoService.findAll().subscribe(e => {
      this.instituicoes = e;

    });
    this.usuarioService.findAll().subscribe(e => {
      this.usuarios = e;
    });
  }

  // findAllPaged(page: number, size: number) {
  //   this.pessoaService.getTotalRecords().subscribe(e => this.totalRecords = e);
  //   this.pessoaService.findPageable(page, size).subscribe(e => this.pessoas = e.content);
  // }

  findAll() {
    this.pessoaService.findAll().subscribe(e => this.pessoas = e);
  }

  save() {
    this.pessoaService.save(this.pessoaEdit).subscribe(e => {
        this.pessoaEdit = new Pessoa();
        //  this.pessoaEdit.status = this.status.value;
        this.dataTable.reset();
        this.findAll();
        this.showDialog = false;
        this.msgs = [{
          severity: 'sucess', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'
        }];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar  registro!'}];
        console.log(this.pessoaEdit);
      }
    );

  }

  newEntity() {
    this.showDialog = true;
    this.pessoaEdit = new Pessoa();
    this.pessoaEdit.tipoPessoa = this.tipoPessoa1[0].value;
    this.pessoaEdit.status = this.status1[0].value;
    this.pessoaEdit.instituicao = this.instituicoes[0];
    this.pessoaEdit.usuario = this.usuarios[0];
  }

  edit(pessoa: Pessoa) {
    this.pessoaEdit = Object.assign({}, pessoa);
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
    this.pessoaEdit = new Pessoa();
  }

  delete(pessoa: Pessoa) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.pessoaService.delete(pessoa.id).subscribe(() => {
          this.msgs = [{
            severity: 'success', summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'
          }];
          this.dataTable.reset();
        }, error => {
          this.msgs = [{
            severity: 'error', summary: 'Erro',
            detail: 'Falha ao remover o registro!'
          }];
        });
      }
    });
  }

  onSelectionType(event) {
    if (event) {
      this.tipoPess = event;
      this.pessoaEdit.tipoPessoa = this.tipoPess;
    } else {
      this.pessoaEdit.tipoPessoa = '';
    }
  }

  onSelectionType2(event) {
    if (event) {
      this.tipoStatus = event;
      this.pessoaEdit.status = this.tipoStatus;
    } else {
      this.pessoaEdit.status = '';
    }
  }

}


