import { Formulario } from './formulario'

export class Resultado {
  id: Number;
  laudo: String;
  usuario: String;
  dtAlteracao: Date;
  arquivo: Array<any>;
  formulario: Formulario;
}
