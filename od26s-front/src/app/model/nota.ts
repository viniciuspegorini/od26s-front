import { Usuario } from './usuario'

export class Nota {
  id: Number;
  valor: Number;
  numero: String;
  tipoNota: String;
  usuario: Usuario;
  dataEmissao: Date;
  anexo: Array<any>;
}
