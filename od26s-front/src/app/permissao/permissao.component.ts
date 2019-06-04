import { Component, OnInit } from '@angular/core';
import { Permissao } from '../model/permissao';
import { CrudService } from '../generic/crud.service';
import {ConfirmationService, LazyLoadEvent, Message, SelectItem} from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {DataTable} from 'primeng/components/datatable/datatable';
import { PermissaoService } from './permissao.service';


@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.css']
})


export class PermissaoComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  show  =  true;
  totalRecords = 10;
  permissoes: Permissao[];
  permissaoEdit: Permissao;
  showDialog = false;


  findAllPaged(page: number, size: number) {
    this.permissaoService.getTotalRecords().subscribe(e => this.totalRecords = e);
    this.permissaoService.findPageable(page, size).subscribe(e => this.pessoas = e.content);
  }


  newEntity() {
    this.showDialog = true;
    this.permissaoEdit = new Permissao();
  }

  edit(permissao: Permissao) {
    this.permissaoEdit = Object.assign({}, permissao);
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
    this.permissaoEdit = new Permissao();
  }

  delete(pessoa: Permissao) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.permissaoService.delete(permissao.id).subscribe(() => {
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

  constructor(private pessoaService: PermissaoService, private confirmationService: ConfirmationService,
    //  private instituicaoService: InstituicaoService, private usuarioService: UsuarioService

      ) {
this.status1 =  [
{label: 'Ativo', value: 'Ativo'},
{label: 'Inativo', value: 'Inativo'}
];



  msgs: Message[] = [];

}

status: any;
status1: SelectItem[];





