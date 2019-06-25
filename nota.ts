import Usuario from "./usuario";

export class Nota {
  id: number;
  numero: string;
  tipoNota: string;
  usuario: Usuario;
  valor: number;
  dataEmissao: Date;
  anexo: Array<any>;
}