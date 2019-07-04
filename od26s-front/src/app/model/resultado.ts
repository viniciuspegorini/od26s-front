import { Formulario } from './formulario';
import {Usuario} from './usuario';

export class Resultado {
  id: number;
  laudo: Array<any>;
  usuario: Usuario;
  dtAlteracao: Date;
  arquivo: Array<any>;
  formulario: Formulario;
}
