import {Component, OnInit, ViewChild} from '@angular/core';
import {Amostra} from '../model/amostra';
import {AmostraService} from '../services/amostra.service';
import {ConfirmationService, Message, LazyLoadEvent} from 'primeng/api';
import {DataTable} from 'primeng/primeng';
import {UsuarioService} from '../services/usuario.service';
import {Usuario} from '../model/usuario';
import {Modelo} from "../model/modelo";

@Component({
  selector: 'app-amostra',
  templateUrl: './amostra.component.html',
  styleUrls: ['./amostra.component.css']
})
export class AmostraComponent implements OnInit {

  amostraEdit = new Amostra();
  usuario = new Usuario();
  amostras: Array<Amostra>;
  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;
  usuarios: Usuario[];
  @ViewChild('dt') dataTable: DataTable;
  br: any;
  msgs: Array<Message>;
  showDialog = false;

  constructor(private amostraService: AmostraService,
              private confirmationService: ConfirmationService,
              private usuarioService: UsuarioService,
  ) {
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
    this.amostraService.findPageable(page, size).subscribe(e => {
      this.amostras = e.content;
      this.totalRecords = e.totalElements;
      
    });
  }

  ngOnInit() {
    this.usuarios = [];
    this.amostraEdit = new Amostra();
    this.carregarCombos();
    this.findAll();
    this.br = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado' ],
      dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
                    'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
      monthNamesShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set',
                         'out', 'nov', 'dez' ],
      today: 'Hoje',
      clear: 'Limpar'
    }
  }

  findAll() {
    this.amostraService.findAll().subscribe(items => {
      this.amostras = items;
    });
  }

  carregarCombos() {
    this.usuarioService.findAll().subscribe(e => this.usuarios  = e );
  }

  newEntity() {
    this.showDialog = true;
    this.amostraEdit = new Amostra();
  }

  openDialog(item: Amostra = new Amostra()) {
    this.amostraEdit = Object.assign({}, item);
    this.showDialog = true;
  }

  save() {
    this.amostraService.save(this.amostraEdit).subscribe(e => {
        this.amostraEdit = new Amostra();
        this.dataTable.reset();
        this.showDialog = false;
        this.msgs = [{severity: 'success', summary: 'Confirmado',
         detail: 'Registro salvo com sucesso!'}];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o registro!'}];
      }
    );
  }

  delete(amostra: Amostra) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover esta amostra?',
      acceptLabel: 'Confirma',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.amostraService.delete(amostra.id).subscribe(() => {
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
    this.amostraEdit = new Amostra();
  }


  edit(amostra: Amostra) {
    this.amostraEdit = Object.assign({}, amostra);
    this.showDialog = true;
  }

}
