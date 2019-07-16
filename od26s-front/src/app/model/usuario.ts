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
  saldo: number;
  password: string;
  tipoPessoa: string;
  orientador: Usuario;
  departamento: string;
  endereco: string;
  cidade: string;
  uf: string;
  cep: string;
  instituicao: Instituicao;
  situacaoCadastro: string;
  permissoes: Array<Permissao>;
}
