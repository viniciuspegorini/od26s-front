
import {Modelo} from './modelo';
import {Pessoa} from './pessoa';
import {Nota} from './nota';
import {Amostra} from './amostra';

export class Formulario {
  id: number;
  status: string;
  metodologia: string;
  naturezaOperacao: string;
  amostra: Amostra;
  modelo: Modelo;
  pessoa: Pessoa;
  nota: Nota;
  quantidadeEnsaios: number;
  valorTotal: number;

}
