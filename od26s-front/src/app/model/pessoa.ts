import { Usuario } from './usuario';
import { Instituicao } from './instituicao';

export class
Pessoa {
    id: number;
    nome: string;
    cpfCnpj: string;
    rg: string;
    telefone: string;
    celular: string;
    tipoPessoa: string;
    departamento: string;
    status: string;
    usuario: Usuario;
    instituicao: Instituicao;
    pessoa: Pessoa;
}
