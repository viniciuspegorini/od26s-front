import { Equipamento } from './equipamento'

export class Preco {
  id: number;
  valor: number;
  unMedida: string;
  tipoPessoa: string;
  equipamento: Equipamento;
}
