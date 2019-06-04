import {Component, OnInit, ViewChild} from '@angular/core';
import {FormularioService} from './formulario.service';
import {ConfirmationService, Message} from 'primeng/api';
import {PessoaService} from '../pessoa/pessoa.service';
import {Pessoa} from '../model/pessoa';
import {Amostra} from '../model/amostra';
import {Modelo} from '../model/modelo';
import {Servico} from '../model/servico';
import {Nota} from '../model/nota';
import {Formulario} from '../model/formulario';
import {DataTable} from 'primeng/primeng';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  formularioEdit: Formulario;
  showDialog = false;
  msgs: Message[] = [];
  amostras: Amostra[];
  modelos: Modelo[];
  servicos: Servico[];
  pessoas: Pessoa[];
  notas: Nota[];

  constructor(private formularioService: FormularioService, private confirmationService: ConfirmationService,
              private pessoaService: PessoaService,
             ) { }

  ngOnInit() {
  }

  newEntity() {
    this.showDialog = true;
    this.formularioEdit = new Formulario();
    // this.pessoaEdit.instituicao = this.instituicoes[0];
  }

  save() {
    this.formularioService.save(this.formularioEdit).subscribe(e => {
        this.formularioEdit = new Formulario();
        this.dataTable.reset();
        this.showDialog = false;
        this.msgs = [{
          severity: 'sucess', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'
        }];
      },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar  registro!' }];
      }
    );

  }

  edit(formulario: Formulario) {
    this.formularioEdit = Object.assign({}, formulario);
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
    this.formularioEdit = new Formulario();
  }

  delete(formulario: Formulario) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.formularioService.delete(formulario.id).subscribe(() => {
          this.msgs = [{
            severity: 'success', summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'
          }];
          this.dataTable.reset();
        }, error => {
          this.msgs = [{
            severity: 'error', summary: 'Erro',
            detail: 'Falha ao remover o registro!'
          }];
        });
      }
    });
  }

}
