import {Component, OnInit, ViewChild} from '@angular/core';
import {Instituicao} from '../model/instituicao';
import {InstituicaoService} from './instituicao.service';
import {ConfirmationService, Message, LazyLoadEvent} from 'primeng/api';
import {DataTable} from 'primeng/primeng';


@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css']
})


export class InstituicaoComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  instituicoes: Instituicao[];
  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;
  instituicaoEdit = new Instituicao();
  showDialog = false;
  msgs: Message[] = [];


  constructor(private instituicaoService: InstituicaoService,
              private confirmationService: ConfirmationService) {
  }

  lazyLoad(event: LazyLoadEvent) {
    const pageNumber = event.first / event.rows;
    this.currentPage = pageNumber;

    this.maxRecords = event.rows;

    setTimeout( () => {
      this.findAllPaged(this.currentPage, this.maxRecords);
    }, 250);
  }

  findAllPaged(page: number, size: number) {
    this.instituicaoService.findPageable(page, size).subscribe(e => {
      this.instituicoes = e.content;
      this.totalRecords = e.totalElements;
    });
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.instituicaoService.findAll().subscribe(e => this.instituicoes = e);
  }

  newEntity() {
    this.showDialog = true;
    this.instituicaoEdit = new Instituicao();
    this.instituicaoEdit = new Instituicao();
  }

  save() {
    this.instituicaoService.save(this.instituicaoEdit).subscribe(e => {
        this.instituicaoEdit = new Instituicao();
        this.dataTable.reset();
        this.showDialog = false;
        this.msgs = [{severity: 'success', summary: 'Confirmado', detail: 'Registro salvo com sucesso!'}];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o registro!'}];
      }
    );
  }

  cancel() {
    this.showDialog = false;
  }


  // cancel() {
  //   this.instituicaoEdit = new Instituicao();
  //   this.showDialog = false;
  // }

  edit(instituicao: Instituicao) {
    // this.instituicaoEdit = instituicao;
    this.instituicaoEdit = Object.assign({}, instituicao);
    this.showDialog = true;
  }



  delete(instituicao: Instituicao) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.instituicaoService.delete(instituicao.id).subscribe(() => {
          this.dataTable.reset();
          this.msgs = [{severity: 'success', summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'}];
        }, error => {
          this.msgs = [{severity: 'error', summary: 'Erro',
            detail: 'Falha ao remover o registro!'}];
        });
      }
    });
  }

  // delete(instituicao: Instituicao) {
  //   this.confirmationService.confirm({
  //     message: 'Esta ação não poderá ser desfeita"',
  //     header: 'Deseja remover o registro?',
  //     acceptLabel: 'Confirmar',
  //     rejectLabel: 'Cancelar',
  //     accept: () => {
  //       this.instituicaoService.delete(instituicao.id).subscribe(() => {
  //           this.findAll();
  //           this.msgs = [{severity: 'success', summary: 'Confirmado', detail: 'Registro salvo com sucesso!'}];
  //         },
  //         error => {
  //           this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o registro!'}];
  //         });
  //     }
  //   });
  // }
}
