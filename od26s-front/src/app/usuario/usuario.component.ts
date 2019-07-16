import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message, SelectItem} from 'primeng/api';
import {Usuario} from '../model/usuario';
import {Instituicao} from '../model/instituicao';
import {DataTable} from 'primeng/components/datatable/datatable';
import {InstituicaoService} from '../services/instituicao.service';
import {UsuarioService} from './usuario.service';
import {LoginService} from '../login/login.service';
import {PermissaoService} from '../services/permissao.service';
import {Permissao} from '../model/permissao';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  show = true;
  totalRecords = 10;
  usuarios: Usuario[];
  usuarioEdit: Usuario;
  showDialog = false;
  msgs: Message[] = [];
  instituicoes: Instituicao[];
  tipoPessoa1: any[];
  tipoPess: string;
  permissao1: Permissao[];
  permiss: Permissao;
  status1: any[];
  tipoStatus: string;
  status: string;
  orientadores: Usuario[];

  statusCadastro = ['A', '', ''];

  constructor(private usuarioService: UsuarioService, private confirmationService: ConfirmationService,
              private instituicaoService: InstituicaoService,  private loginService: LoginService,
              private permissaoService: PermissaoService
  ) {
    this.status1 = [
      {label: 'Ativo', value: 'Ativo'},
      {label: 'Inativo', value: 'Inativo'}
    ];

    this.tipoPessoa1 = [
      {label: 'Externo', value: 'Externo'},
      {label: 'Aluno', value: 'Aluno'},
      {label: 'Orientador', value: 'Orientador'},
      {label: 'Pesquisador', value: 'Pesquisador'},
    ];
  }

  hasRole(permissao: string) {
    return this.loginService.hasRole(permissao);
  }


  ngOnInit() {
    this.usuarioEdit = new Usuario();
    this.carregarCombos();
    this.findAll();
  }

  carregarCombos() {
    this.instituicaoService.findAll().subscribe(e => {
      this.instituicoes = e;
    });
    this.permissaoService.findAll().subscribe(e => {
      this.permissao1 = e;
    });
  }

  findAll() {
    this.usuarioService.findAll().subscribe(e => {
      this.usuarios = e;
      this.orientadores = this.usuarios.filter(u => u.tipoPessoa === 'Orientador');
    });
  }

  save() {

    if (this.hasRole('ADMIN')) {
      this.usuarioEdit.situacaoCadastro = this.statusCadastro[0];
    }

    if (!!this.usuarioEdit.orientador && !this.usuarioEdit.orientador.id) {
      delete this.usuarioEdit.orientador;
    }

    this.usuarioEdit.permissoes = [this.permiss];
    // this.usuarioEdit.permissoes = [{ id: this.usuarioEdit.id , nome: this.permissao1[0].nome }];
    // this.usuarioEdit.permissoes.push(this.permiss);

    // console.log(this.usuarioEdit)

    this.usuarioService.save(this.usuarioEdit).subscribe(e => {
        this.usuarioEdit = new Usuario();
        this.usuarioEdit.orientador = new Usuario();
        this.dataTable.reset();
        this.findAll();
        this.showDialog = false;
        this.msgs = [{
          severity: 'success', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'
        }];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar  registro!'}];
        console.log(this.usuarioEdit);
      }
    );

  }

  newEntity() {
    this.showDialog = true;
    this.usuarioEdit = new Usuario();
    this.usuarioEdit.tipoPessoa = this.tipoPessoa1[0].value;
    this.usuarioEdit.status = this.status1[0].value;
    this.usuarioEdit.instituicao = this.instituicoes[0];
    this.usuarioEdit.orientador = new Usuario();
    this.permiss = this.permissao1[0];
  }

  edit(usuario: Usuario) {
    this.usuarioEdit = Object.assign({}, usuario);
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
    this.usuarioEdit = new Usuario();
  }

  delete(usuario: Usuario) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.usuarioService.delete(usuario.id).subscribe(() => {
          this.msgs = [{
            severity: 'success', summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'
          }];
          this.dataTable.reset();
        }, error => {
          this.msgs = [{
            severity: 'error', summary: 'Erro',
            detail: 'Falha ao remover o registro!'
          }];
        });
      }
    });
  }

  onSelectionType(event) {
    if (event) {
      this.tipoPess = event;
      this.usuarioEdit.tipoPessoa = this.tipoPess;
    } else {
      this.usuarioEdit.tipoPessoa = '';
    }
  }

  onSelectionType2(event) {
    if (event) {
      this.tipoStatus = event;
      this.usuarioEdit.status = this.tipoStatus;
    } else {
      this.usuarioEdit.status = '';
    }
  }
}


