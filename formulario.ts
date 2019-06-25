import Usuario from "./usuario";
import Nota from './nota'
import Amostra from './amostra'

export class Formulario {
  id: number;
  usuario: Usuario;
  nota: Nota;
  metodologia: string;
  naturezaOperacao: string;
  departamento: string;
  quantidade_ensaios: number;
  valor_total: number;
  amostra: Amostra;
  status: string;
}