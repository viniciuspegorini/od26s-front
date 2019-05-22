import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { PessoaService } from './pessoa.service';
import { Usuario } from '../model/usuario';
import { Instituicao } from '../model/instituicao';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})


export class PessoaComponent implements OnInit {

  pessoas: Pessoa[];
  totalRecords: number = 10;
  maxRecords = 10;
  currentPage = 1;

  usuario = new Usuario();
  pessoaEdit: Pessoa;
  showDialog = false;
  msgs: Message[] = [];
  instituicoes: Instituicao[];

  constructor(private pessoaService: PessoaService,
              private confirmationService: ConfirmationService,
             private instituicaoService: InstituicaoService) {}
   
  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.pessoaService.findAll().subscribe(e => this.pessoas = e);
  }


  newEntity() {
    this.pessoaEdit = new Pessoa();
    this.showDialog = true;
  }

  save() {
    this.pessoaService.save(this.pessoaEdit).subscribe(e => {
      this.pessoaEdit = new Pessoa();
      this.pessoaEdit.usuario = this.usuario;
      this.findAll();
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

  cancel() {
    this.showDialog = false;
    this.pessoaEdit = new Pessoa();
  }

  edit(pessoa: Pessoa) {
    //  this.generoEdit = genero;
    //Object.assign({} = faz uma copia do objeto para this.generoEdit
    this.pessoaEdit = Object.assign({}, pessoa);
    this.showDialog = true;
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
          this.findAll();
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


