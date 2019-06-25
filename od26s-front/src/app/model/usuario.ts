import { Instituicao } from './instituicao';

export class
Usuario {
  id: number;
  nome: string;
  cpfCnpj: string;
  rg: string;
  telefone: string;
  celular: string;
  tipoPessoa: string;
  departamento: string;
  status: string;
  email: string;
  senha: string;
  dtCricao: string;
  saldo: number;
  instituicao: Instituicao;
  idOrientador: Usuario;
}
