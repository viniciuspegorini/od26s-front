import {Component, OnInit} from '@angular/core';
import {Servico} from '../model/servico';
import {ConfirmationService, Message} from 'primeng/api';
import {ServicoService} from './servico.service';
import {Modelo} from "../model/modelo";
import {ModeloService} from "../services/modelo.service";
import {PrecoService} from "../preco/preco.service";
import {Preco} from "../model/preco";

@Component({
  selector: 'app-cad-servicos',
  templateUrl: './cad-servicos.component.html',
  styleUrls: ['./cad-servicos.component.css']
})
export class CadServicosComponent implements OnInit {

  servicos: Array<Servico>;
  modelos: Array<Modelo>;
  precos: Array<Preco>;
  servicoEdit: Servico;

  msgs: Array<Message>;
  showDialog = false;

  constructor(
    private servicoService: ServicoService,
    private modeloService: ModeloService,
    private precoService: PrecoService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.findAllModelos();
    this.findAllPrecos();
  }

  findAllModelos() {
    this.modeloService.findAll().subscribe(modelos => {
      this.modelos = modelos;
    });
  }

  findAllPrecos() {
    this.precoService.findAll().subscribe(precos => {
      this.precos = precos;
    });
  }

}
