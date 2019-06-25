import { Nota } from './nota'
import { Modelo } from './modelo'
import { Amostra } from './amostra'
import { Usuario } from './usuario'

export class Formulario {
  id: Number;
  nota: Nota;
  status: String;
  modelo: Modelo;
  amostra: Amostra;
  usuario: Usuario;
  valor_total: Number;
  metodologia: String;
  departamento: String;
  naturezaOperacao: String;
  quantidade_ensaios: Number;
}
