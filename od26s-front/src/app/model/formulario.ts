import { Instituicao } from './instituicao';
import {Amostra} from './amostra';
import {Modelo} from './modelo';
import {Pessoa} from './pessoa';
import {Servico} from './servico';
import {Nota} from './nota';

export class Formulario {
  id: number;
  status: string;
  metodologiaAmostra: string;
  metodologiaAnalitica: string;
  naturezaOperacao: string;
  amostra: Amostra;
  modelo: Modelo;
  pessoa: Pessoa;
  nota: Nota;
  quantidade: number;
  valorTotal: number;

}
