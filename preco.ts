import Equipamento from './equipamento'

export class Preco {
  id: number;
  tipoPessoa: string;
  unMedida: string;
  valor: number;
  equipamento: Equipamento;
}