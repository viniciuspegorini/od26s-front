import { Permissao } from './permissao';
import { Instituicao } from './instituicao';

export class Usuario {
  id: number;
  rg: string;
  nome: string;
  email: string;
  status: string;
  cpfCnpj: string;
  celular: string;
  dtCriacao: Date;
  telefone: string;
  password: string;
  tipoPessoa: string;
  orientador: Usuario;
  departamento: string;
  instituicao: Instituicao;
  permissao: Array<Permissao>;
  situacaoCadastro: string;
}
