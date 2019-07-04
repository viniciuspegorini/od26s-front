import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, DataTable, LazyLoadEvent, Message} from 'primeng/primeng';
import {Resultado} from '../model/resultado';
import {ResultadoService} from '../services/resultado.service';
import {environment} from '../../environments/environment';
import {Usuario} from "../model/usuario";
import {UsuarioService} from "../services/usuario.service";
import {Amostra} from "../model/amostra";
import {Formulario} from "../model/formulario";
import {FormularioService} from "../services/formulario.service";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  resultados: Resultado[];
  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;
  resultadoEdit = new Resultado();
  showDialog = false;
  msgs: Message[] = [];
  uploadedFiles: any[] = [];
  urlApi: string = environment.api;
  today: number = Date.now();
  usuarios: Usuario[];
  formularios: Formulario[];


  constructor(private resultadoService: ResultadoService,
              private confirmationService: ConfirmationService,
              private usuarioService: UsuarioService,
              private formularioService: FormularioService) {
  }

  carregarCombos() {
    this.usuarioService.findAll().subscribe(e => this.usuarios = e );
    this.formularioService.findAll().subscribe(e => this.formularios = e);
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
    this.resultadoService.findPageable(page, size).subscribe(e => {
      this.resultados = e.content;

      this.totalRecords = e.totalElements;
    });
  }

  ngOnInit() {
    this.usuarios = [];
    this.carregarCombos();
    this.findAll();
  }

  findAll() {
    this.resultadoService.findAll().subscribe(e => this.resultados = e);
  }

  newEntity() {
    this.showDialog = true;
    this.resultadoEdit = new Resultado();
  }



  save() {
    this.resultadoService.save(this.resultadoEdit).subscribe(e => {
        this.resultadoEdit = new Resultado();
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



  edit(resultado: Resultado) {
    // this.resultadoEdit = resultado;
    this.resultadoEdit = Object.assign({}, resultado);
    this.showDialog = true;
  }



  delete(resultado: Resultado) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.resultadoService.delete(resultado.id).subscribe(() => {
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

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.msgs = [{severity: 'info', summary: 'Arquivo salvo',
      detail: 'Arquivo salvo com sucesso!'}];
    setTimeout(() => {
      this.dataTable.reset();
      this.showDialog = false;
      this.uploadedFiles = [];
    }, 500);
  }

}
