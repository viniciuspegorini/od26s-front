import { Component, OnInit,ViewChild} from '@angular/core';
import {Nota} from '../model/nota';
import {UsuarioService} from '../services/usuario.service';
import {Usuario} from '../model/usuario';
import {FormularioService} from '../services/formulario.service';
import {NotaService} from '../services/nota.service';
import {Formulario} from '../model/formulario';
import {DataTable} from 'primeng/primeng';
import { ConfirmationService, Message, LazyLoadEvent } from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  notaEdit = new Nota();
  tipoNotaEdit = {};
  tipoNota: any;
  usuario = new Usuario();
  formularioEdit = new Formulario();
  notas: Array<Nota>;
  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;
  usuarios: Usuario[];
  formularios: Formulario[];
  formsFilter: Formulario[] = [];
  @ViewChild('dt') dataTable: DataTable;
  br: any;
  msgs: Array<Message>;
  showDialog = false;
 // inputForm = null;


   // atributos utilizados para o upload
   uploadedFiles: any[] = [];
   urlApi: string = environment.api;
   today: number = Date.now();

   tiponotas =[
    { nome: 'Crédito', tipo: 'C'},
    { nome: 'Débito', tipo: 'D'}
   ];

  constructor(private notaService: NotaService, 
              private formularioService: FormularioService,
              private usuarioService: UsuarioService,
              private confirmationService: ConfirmationService) { } 

              lazyLoad(event: LazyLoadEvent) {
    const pageNumber = event.first / event.rows;
    this.currentPage = pageNumber;

    this.maxRecords = event.rows;

    setTimeout( () => {
      this.findAllPaged(this.currentPage, this.maxRecords);
    }, 250);
  }

  findAllPaged(page: number, size: number) {
    this.notaService.findPageable(page, size).subscribe(e => {
      this.notas = e.content;
      this.totalRecords = e.totalElements;      
    });
  }

  ngOnInit() {
    this.usuarios = [];
    this.notaEdit = new Nota();
    //this.notaEdit.tipoNota = this.tiponotas[0].tipo;
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
    this.notaService.findAll().subscribe(items => {
      this.notas = items;
    });
  }

  carregarCombos() {
    this.usuarioService.findAll().subscribe(e => this.usuarios  = e );
    this.formularioService.findAll().subscribe(e => this.formularios  = e );
  }

  newEntity() {
    this.showDialog = true;
    this.notaEdit = new Nota();
    this.notaEdit.tipoNota = this.tiponotas[0].tipo;
  }

  openDialog(item: Nota = new Nota()) {
    this.notaEdit = Object.assign({}, item);
    this.showDialog = true;
    
  }

  filtrarFormulario(){
    this.formsFilter = this.formularios.filter
    (form => form.status === 'Em faturamento' && form.usuario.id === this.notaEdit.usuario.id);
    console.log(this.formsFilter[0]);
  }

  save() {
    this.notaEdit.tipoNota = this.tiponotas[0].tipo; 
    this.notaService.save(this.notaEdit).subscribe(e => {
        this.notaEdit = new Nota();
        this.dataTable.reset();
        this.showDialog = false;
        
        this.msgs = [{
          severity: 'success', 
          summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'}];

      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o registro!'}];
      }
    );
  }


  delete(nota: Nota) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover esta nota?',
      acceptLabel: 'Confirma',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.notaService.delete(nota.id).subscribe(() => {
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
    this.notaEdit = new Nota();
  }


  edit(nota: Nota) {
    this.notaEdit = Object.assign({}, nota);
    this.showDialog = true;
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
