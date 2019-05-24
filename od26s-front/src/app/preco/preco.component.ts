import {Component, OnInit, ViewChild} from '@angular/core';
import {Preco} from "../model/preco";
import {PrecoService} from "../services/preco.service";;

import {ConfirmationService, Message} from 'primeng/api';
import {DataTable} from 'primeng/primeng';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import {Equipamento} from "../model/equipamento";
import {EquipamentoService} from "../services/equipamento.service";

@Component({
  selector: 'app-preco',
  templateUrl: './preco.component.html',
  styleUrls: ['./preco.component.css']
})
export class PrecoComponent implements OnInit {


  precos: Preco[];

  precoEdit = new Preco();
  showDialog = false;
  msgs: Message[] = [];
  equipamento: Equipamento[];



  public editor = ClassicEditorBuild;
  @ViewChild('dt') dataTable: DataTable;

  constructor(private precoService: PrecoService,
              private confirmationService: ConfirmationService,
              private equipamentoService: EquipamentoService) { }

  ngOnInit() {
    this.findAll();

  }


  findAll() {
    this.precoService.findAll().subscribe(e => this.precos = e);
    this.equipamentoService.findAll().subscribe(e => this.equipamento = e);
  }

  newEntity() {
    this.precoEdit = new Preco();
    this.showDialog = true;
    this.precoEdit.equipamento = this.equipamento[0];

  }

  cancel() {
    this.showDialog = false;
    this.precoEdit = new Preco();
  }

  save() {
    this.precoService.save(this.precoEdit).subscribe(e => {
      this.precoEdit = new Preco();
      this.dataTable.reset();
      this.findAll();
      this.showDialog = false;
      this.msgs = [{
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Registro salvo com sucesso!'
      }];
    }, error => {
      this.msgs = [{
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao Salvar o registro'
      }];
    });
  }

  edit(preco: Preco) {
    this.precoEdit = Object.assign({}, preco);
    this.showDialog = true;
  }

  delete(preco: Preco) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.precoService.delete(preco.id).subscribe(() => {
          this.findAll();
          this.precoEdit = new Preco();
          this.dataTable.reset();
          this.findAll();
          this.showDialog = false;
          this.msgs = [{
            severity: 'success',
            summary: 'Confirmado',
            detail: 'Registro salvo com sucesso!'
          }];
        }, error => {
          this.msgs = [{
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao Remover o registro'
          }];
        });
      }
    });
  }
}
