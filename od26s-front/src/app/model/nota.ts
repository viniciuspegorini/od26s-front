import { Usuario } from './usuario'

export class Nota {
  id: number;
  valor: number;
  numero: string;
  tipoNota: string;
  usuario: Usuario;
  dataEmissao: Date;
  anexo: Array<any>;
  formularios: [];
}
