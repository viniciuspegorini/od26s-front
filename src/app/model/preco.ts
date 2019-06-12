import {Equipamento} from './equipamento';

export class Preco {
  id: number;
  tipo_pessoa: string;
  un_medida: string;
  valor: number;
  equipamento: Equipamento;
}
