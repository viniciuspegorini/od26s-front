import {Component, OnInit} from '@angular/core';
import {Equipamento} from '../model/equipamento';
import {CardEquipamentoService} from './card-equipamento.service';

@Component({
  selector: 'app-cad-equipamento',
  templateUrl: './cad-equipamento.component.html',
  styleUrls: ['./cad-equipamento.component.css']
})
export class CadEquipamentoComponent implements OnInit {

  equipamentos: Array<Equipamento> = [];
  tableHeaders: Array<string> = [
    'ID',
    'Nome',
    ''
  ];
  equipamentoEdit: Equipamento;
  loader = false;
  loaderDelete = false;

  constructor(private cadEquipamentoService: CardEquipamentoService) {
  }

  ngOnInit() {
    this.findAll();
    this.equipamentoEdit = new Equipamento();
  }

  findAll() {
    this.cadEquipamentoService.findAll().subscribe(items => this.equipamentos = items);
  }

  showForm(equipamento: Equipamento, frame: any) {
    if (!!equipamento) {
      this.equipamentoEdit = JSON.parse(JSON.stringify(equipamento));
    } else {
      this.equipamentoEdit = new Equipamento();
    }

    frame.show();
  }

  closeForm(frame: any) {
    frame.hide();
    this.loader = false;
    this.equipamentoEdit = new Equipamento();
  }

  save(frame) {
    this.loader = true;
    this.cadEquipamentoService.save(this.equipamentoEdit)
      .subscribe(e => {
        this.closeForm(frame);
        this.findAll();
      });
  }

  showModalDelete(id: number, frame: any) {
    this.equipamentoEdit.id = id;
    frame.show();
  }

  closeModalDelete(frame: any) {
    frame.hide();
    this.loaderDelete = false;
    this.equipamentoEdit = new Equipamento();
  }

  remove(frame: any) {
    this.loaderDelete = true;
    this.cadEquipamentoService.delete(this.equipamentoEdit.id).subscribe(() => {
      this.findAll();
      this.closeModalDelete(frame);
    });
  }
}
