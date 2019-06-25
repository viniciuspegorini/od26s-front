import Formulario from './formulario'

export class Resultado {
  id: number;
  arquivo: Array<any>;
  usuario: string;
  dtAlteracao: Date;
  formulario: Formulario;
  laudo: string;
}