import { Nota } from './nota';
import { Modelo } from './modelo';
import { Amostra } from './amostra';
import { Usuario } from './usuario';

export class Formulario {
  id: number;
  nota: Nota;
  status: string;
  modelo: Modelo;
  amostra: Amostra;
  usuario: Usuario;
  valorTotal: number;
  // departamento: string;
  naturezaOperacao: string;
  quantidadeEnsaios: number;
  metodologia: string;
}
