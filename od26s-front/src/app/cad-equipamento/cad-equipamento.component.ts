import {Component, OnInit} from '@angular/core';
import {Equipamento} from '../model/equipamento';
import {EquipamentoService} from '../services/equipamento.service';
import {ConfirmationService, Message} from 'primeng/api';

@Component({
  selector: 'app-cad-equipamento',
  templateUrl: './cad-equipamento.component.html',
  styleUrls: ['./cad-equipamento.component.css']
})
export class CadEquipamentoComponent implements OnInit {

  equipamentoEdit: Equipamento;
  equipamentos: Array<Equipamento>;
  totalRecords: number;
  msgs: Array<Message>;
  showDialog = false;

  constructor(
    private equipamentoService: EquipamentoService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.equipamentoEdit = new Equipamento();
    this.findAll();
  }

  findAll() {
    this.equipamentoService.findAll().subscribe(items => {
      this.equipamentos = items;
    });
  }

  openDialog(item: Equipamento = new Equipamento()) {
    this.equipamentoEdit = Object.assign({}, item);
    this.showDialog = true;
  }

  save() {
    this.equipamentoService.save(this.equipamentoEdit).subscribe(() => {
      this.msgs = [{
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Equipamento salvo com sucesso!'
      }];
      this.equipamentoEdit.nome = '';
      this.cancel();
      this.findAll();
    }, error => {
      this.msgs = [{
        severity: 'error',
        summary: 'Falhou',
        detail: 'Falha ao salvar equipameto!'
      }];
    });
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover este equipamento?',
      acceptLabel: 'Remover',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.equipamentoService.delete(id).subscribe(() => {
          this.findAll();
          this.msgs = [{
            severity: 'success',
            summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'
          }];
        }, error => {
          this.msgs = [{
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao remover o registro!'
          }];
        });
      }
    });
  }

  cancel() {
    this.showDialog = false;
    this.equipamentoEdit = new Equipamento();
  }

}
