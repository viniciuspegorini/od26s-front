import {Component, OnInit} from '@angular/core';
import {ModelosService} from '../services/modelo.service';
import {Modelo} from '../model/modelo';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-cadastro-modelo',
  templateUrl: './cadastro-modelo.component.html',
  styleUrls: ['./cadastro-modelo.component.css']
})
export class CadastroModeloComponent implements OnInit {

  modelos: Modelo[];
  modeloEdit = new Modelo();

  msgs: Message[] = [];

  constructor(private modeloService: ModelosService) {
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.modeloService.findAll().subscribe(e => this.modelos = e);
  }

  newEntity() {
    this.modeloEdit = new Modelo();
  }

  save() {
    // this.modeloService.save(this.modeloEdit).subscribe(e => {
    //   this.modeloEdit = new Modelo();
    //   this.findAll();
    //   this.msgs = [{
    //     severity: 'success',
    //     summary: 'Confirmado',
    //     detail: 'Registro salvo com sucesso!'
    //   }];
    // }, error => {
    //   this.msgs = [{
    //     severity: 'error',
    //     summary: 'Erro',
    //     detail: 'Falha ao Salvar o registro'
    //   }];
    // });
  }

  edit(modelo: Modelo) {
    this.modeloEdit = Object.assign({}, modelo);
    // this.showDialog = true;
  }

  delete(modelo: Modelo) {
    // this.confirmationService.confirm({
    //   message: 'Esta ação não poderá ser desfeita!',
    //   header: 'Deseja remover o registro?',
    //   acceptLabel: 'Confirmar',
    //   rejectLabel: 'Cancelar',
    //   accept: () => {
    //     this.usuariosService.delete(usuario.id).subscribe(() => {
    //       this.findAll();
    //       this.usuarioEdit = new Usuario();
    //       this.dataTable.reset();
    //       this.findAll();
    //       this.showDialog = false;
    //       this.msgs = [{
    //         severity: 'success',
    //         summary: 'Confirmado',
    //         detail: 'Registro salvo com sucesso!'
    //       }];
    //     }, error => {
    //       this.msgs = [{
    //         severity: 'error',
    //         summary: 'Erro',
    //         detail: 'Falha ao Remover o registro'
    //       }];
    //     });
    //   }
    // });
  }
}
