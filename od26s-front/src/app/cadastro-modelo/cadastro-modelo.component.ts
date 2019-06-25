import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeloService} from '../services/modelo.service';
import {Modelo} from '../model/modelo';
import {ConfirmationService, Message} from 'primeng/api';
import {DataTable} from 'primeng/primeng';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Preco } from '../model/preco';
import { PrecoService } from '../services/preco.service';

@Component({
  selector: 'app-cadastro-modelo',
  templateUrl: './cadastro-modelo.component.html',
  styleUrls: ['./cadastro-modelo.component.css']
})
export class CadastroModeloComponent implements OnInit {

  public editor = ClassicEditorBuild;

  @ViewChild('dt') dataTable: DataTable;

  modelos: Modelo[];
  precos: Preco[];
  modeloEdit = new Modelo();

  showDialog = false;
  msgs: Message[] = [];

  constructor(private modeloService: ModeloService,
              private precoService: PrecoService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.findAll();
    this.findAllPrecos();
  }

  findAll() {
    this.modeloService.findAll().subscribe(e => this.modelos = e);
  }

  findAllPrecos() {
    this.precoService.findAll().subscribe(precos => {
      this.precos = precos;
    });
  }

  newEntity() {
    this.modeloEdit = new Modelo();
    this.modeloEdit.preco = this.precos[0];
    this.modeloEdit.resultado = '';
    this.modeloEdit.metodologia = '';
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
    this.modeloEdit = new Modelo();
  }

  save() {
    console.log(this.modeloEdit);

    this.modeloService.save(this.modeloEdit).subscribe(e => {
      this.modeloEdit = new Modelo();
      this.dataTable.reset();
      this.findAll();
      this.showDialog = false;
      this.msgs = [{
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Registro salvo com sucesso!'
      }];
    }, error => {
      console.error(error)
      this.msgs = [{
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao Salvar o registro'
      }];
    });
  }

  edit(modelo: Modelo) {
    this.modeloEdit = Object.assign({}, modelo);

    if (!this.modeloEdit.preco) {
      this.modeloEdit.preco = this.precos[0];
    }

    this.showDialog = true;
  }

  delete(modelo: Modelo) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.modeloService.delete(modelo.id).subscribe(() => {
          this.findAll();
          this.modeloEdit = new Modelo();
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
