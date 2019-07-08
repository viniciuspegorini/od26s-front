import { Formulario } from './formulario';

export class Resultado {
  id: number;
  laudo: string;
  usuario: string;
  dtAlteracao: Date;
  arquivo: Array<any>;
  formulario: Formulario;
}
