import { Permissao } from './permissao';
import { Instituicao } from './instituicao';
import {SituacaoCadastro} from './situacao-cadastro.enum';

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
  instituicao: Instituicao;
  situacaoCadastro: string;
  permissao: Array<Permissao>;
}
