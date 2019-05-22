import {Component, OnInit, ViewChild} from '@angular/core';
import {Instituicao} from '../model/instituicao';
import {InstituicaoService} from '../service/instituicao.service';
import {ConfirmationService} from 'primeng/api';
import {DataTable} from 'primeng/primeng';


@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css']
})


export class InstituicaoComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  instituicoes: Instituicao[];
  instituicaoEdit = new Instituicao();
  showDialog = false;
  msgs = [];


  constructor(private instituicaoService: InstituicaoService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.instituicaoService.findAll().subscribe(e => this.instituicoes = e);
  }

  newEntity() {
    this.instituicaoEdit = new Instituicao();
    this.showDialog = true;
  }

  save() {
    this.instituicaoService.save(this.instituicaoEdit).subscribe(e => {
        this.instituicaoEdit = new Instituicao();
        this.findAll();
        this.showDialog = false;
        this.msgs = [{severity: 'success', summary: 'Confirmado', detail: 'Registro salvo com sucesso!'}];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o registro!'}];
      }
    );
  }

  cancel() {
    this.instituicaoEdit = new Instituicao();
    this.showDialog = false;
  }

  edit(instituicao: Instituicao) {
    this.instituicaoEdit = instituicao;
    this.instituicaoEdit = Object.assign({}, instituicao);
    this.showDialog = true;
  }

  delete(instituicao: Instituicao) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita"',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.instituicaoService.delete(instituicao.id).subscribe(() => {
            this.findAll();
            this.msgs = [{severity: 'success', summary: 'Confirmado', detail: 'Registro salvo com sucesso!'}];
          },
          error => {
            this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o registro!'}];
          });
      }
    });
  }
}
