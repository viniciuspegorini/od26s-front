import {Pessoa} from "./pessoa";
import {Nota} from "./nota";
import {Amostra} from "./amostra";
import {Modelo} from "./modelo";

export class Formulario {
  id: number;
  pessoa: Pessoa;
  nota: Nota;
  status: string;
  metodologiaAmostra: string;
  metodologiaAnalitica: string;
  departamento: string;
  amostra: Amostra;
  modelo: Modelo;
  quantidadeEnsaios: number;
  valorTotal: number;
  dataEmissao: Date;
}
