import { Message, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../usuario/usuario.service';
import { DataTable } from 'primeng/primeng';
import { Pessoa } from '../model/pessoa';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})


export class UsuarioComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  show: true;
  usuarios: Usuario[];
  totalRecords: 10;
  usuarioEdit = new Usuario();
  showDialog = false;
  msgs: Message[] = [];

  constructor(private usuarioService: UsuarioService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.findAll();
  }
  save() {
    this.usuarioService.save(this.usuarioEdit).subscribe(e => {
      this.usuarioEdit = new Usuario();
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

  findAll() {
    this.usuarioService.findAll().subscribe(e => this.usuarios = e);
  }

  newEntity() {
    this.showDialog = true;
    this.usuarioEdit = new Usuario();
    this.usuarioEdit.pessoa = new Pessoa();
    this.usuarioEdit.pessoa.usuario = this.usuarioEdit;
  }

  cancel() {
    this.showDialog = false;
  }

  edit(usuario: Usuario) {
    this.usuarioEdit = Object.assign({}, usuario);
    this.showDialog = true;
  }

  delete(usuario: Usuario) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.usuarioService.delete(usuario.id).subscribe(() => {
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
