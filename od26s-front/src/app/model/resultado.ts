import { Formulario } from './formulario';
import {Usuario} from './usuario';

export class Resultado {
  id: number;
  usuario: Usuario;
  today: Date;
  arquivo: Array<any>;
  formulario: Formulario;
  laudo: string;
}
