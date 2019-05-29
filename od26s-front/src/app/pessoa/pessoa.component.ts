import {Component, OnInit, ViewChild} from '@angular/core';
import { Pessoa } from '../model/pessoa';
import {ConfirmationService, LazyLoadEvent, Message, SelectItem} from 'primeng/api';
import { PessoaService } from './pessoa.service';
import { Usuario } from '../model/usuario';
import { Instituicao } from '../model/instituicao';
import {DataTable} from 'primeng/components/datatable/datatable';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})


export class PessoaComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  totalRecords = 10;
  pessoas: Pessoa[];
  // maxRecords = 10;
  // currentPage = 1;

  pessoaEdit: Pessoa;
  showDialog = false;
  msgs: Message[] = [];
  instituicoes: Instituicao[];
  // usuarios = new Usuario();
  usuarios: Usuario[];

  tipoPessoa: any;
  status: any;
  tipoPessoa1: SelectItem[];
  status1: SelectItem[];

  constructor(private pessoaService: PessoaService, private confirmationService: ConfirmationService,
              // private institutoService: InstitutoService, private usuarioService: UsuarioService
              ) {
    this.status1 =  [
      {label: 'Ativo', value: 'Ativo'},
      {label: 'Inativo', value: 'Inativo'}
    ];

    this.tipoPessoa1 =  [
      {label: 'Orientador', value: 'Orientador'},
      {label: 'Aluno', value: 'Aluno'},
      {label: 'Pesquisador', value: 'Pesquisador'},
      {label: 'Externo', value: 'Externo'},
    ];
  }

  ngOnInit() {
    this.carregarCombos();
  }

  carregarCombos() {
    // this.instituicaoService.findAll().subscribe(e => this.instituicoes = e);
    // this.usuarioService.findAll().subscribe(e => this.usuarios = e);
  }

  findAllPaged(page: number, size: number) {
    this.pessoaService.getTotalRecords().subscribe(e => this.totalRecords = e);
    this.pessoaService.findPageable(page, size).subscribe(e => this.pessoas = e.content);
  }

  save() {
    this.pessoaService.save(this.pessoaEdit).subscribe(e => {
        this.pessoaEdit = new Pessoa();
        this.pessoaEdit.tipoPessoa = this.tipoPessoa.value;
        this.pessoaEdit.status = this.status.value;
        this.dataTable.reset();
        this.showDialog = false;
        this.msgs = [{
          severity: 'sucess', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'
        }];
      },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar  registro!' }];
      }
    );

  }
  // consiste de carregar um conteúdo apenas quando ele é realmente requisitado pelo usuário
  // lazyLoad(event: LazyLoadEvent) {
  //   const pageNumber = event.first / event.rows;
  //   this.currentPage = pageNumber;
  //
  //   this.maxRecords = event.rows;
  //
  //   setTimeout(() => {
  //     this.findAllPaged(this.currentPage, this.maxRecords);
  //   }, 250);
  // }

  newEntity() {
    this.showDialog = true;
    this.pessoaEdit = new Pessoa();
   // this.pessoaEdit.instituicao = this.instituicoes[0];
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


}


