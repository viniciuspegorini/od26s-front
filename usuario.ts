import Permissao from './permissao'
import Instituicao from './instituicao'

export class Usuario {
  id: number;
  email: string;
  permissao: Array<Permissao>;
  cpfCnpj: string;
  rg: string;
  telefone: string;
  celular: string;
  tipoPessoa: string;
  departamento: string;
  instituicao: Instituicao;
  status: string;
  saldo: number;
  dtCriacao: Date;
  orientador: Usuario;
  password: string;
}