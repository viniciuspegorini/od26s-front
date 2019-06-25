import { Permissao } from './permissao'
import { Instituicao } from './instituicao'

export class Usuario {
  id: Number;
  rg: String;
  nome: String;
  email: String;
  status: String;
  cpfCnpj: String;
  celular: String;
  dtCriacao: Date;
  telefone: String;
  password: String;
  tipoPessoa: String;
  orientador: Usuario;
  departamento: String;
  instituicao: Instituicao;
  permissao: Array<Permissao>;
}
