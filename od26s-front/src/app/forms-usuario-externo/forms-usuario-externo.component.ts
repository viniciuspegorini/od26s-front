import {Component, OnInit} from '@angular/core';
import {Formulario} from '../model/formulario';
import {FormsUsuarioExternoService} from './forms-usuario-externo.service';
import {Amostra} from '../model/amostra';
import {Nota} from '../model/nota';
import {Modelo} from '../model/modelo';
import {Pessoa} from '../model/pessoa';

@Component({
  selector: 'app-forms-usuario-externo',
  templateUrl: './forms-usuario-externo.component.html',
  styleUrls: ['./forms-usuario-externo.component.css']
})
export class FormsUsuarioExternoComponent implements OnInit {

  formularios: Array<Formulario>;
  formEdit: Formulario;
  dialogInfo = false;

  constructor(private formsUsuarioExternoService: FormsUsuarioExternoService) {
  }

  ngOnInit() {
    this.findAll();
    this.formEdit = new Formulario();
  }

  findAll() {
    // this.formsUsuarioExternoService.findAll().subscribe(e => {
    //   console.log(e);
    // });
    // tslint:disable-next-line:radix
    const totalItems = parseInt(String(Math.random() * (5 - 1) + 1));
    this.formularios = [];

    for (let i = 0; i < totalItems; i++) {
      const form = new Formulario();

      form.id = i + 1;
      form.amostra = new Amostra();
      form.departamento = 'Química';
      form.metodologiaAmostra = 'metodologia amostra';
      form.metodologiaAnalitica = 'metodologia analitica';
      form.modelo = new Modelo();
      form.nota = new Nota();
      form.pessoa = new Pessoa();
      // tslint:disable-next-line:radix
      form.quantidadeEnsaios = parseInt(String(Math.random() * (5 - 1) + 1));
      form.status = 'analise';
      form.valorTotal = parseFloat((Math.random() * (5 - 1) + 1).toFixed(2));
      form.dataEmissao = new Date();

      this.formularios.push(form);
    }
  }

  formatDate(date) {
    if (!date) {
      return '';
    } else {
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
        month = `0${month}`;
      }

      if (day < 10) {
        day = `0${day}`;
      }

      return `${day}/${month}/${year}`;
    }
  }

  showDialogInfo(form: Formulario) {
    this.formEdit = form;
    this.dialogInfo = true;
  }

  cancel() {
    this.dialogInfo = false;
    this.formEdit = new Formulario();
  }
}
