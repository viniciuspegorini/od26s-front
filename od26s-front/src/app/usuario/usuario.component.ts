import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message, SelectItem} from 'primeng/api';
import {Usuario} from '../model/usuario';
import {Instituicao} from '../model/instituicao';
import {DataTable} from 'primeng/components/datatable/datatable';
import {InstituicaoService} from '../services/instituicao.service';
import {UsuarioService} from './usuario.service';
import {LoginService} from '../login/login.service';
import {SituacaoCadastro} from '../model/situacao-cadastro.enum';

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
  status1: any[];
  tipoStatus: string;
  status: string;

  statusCadastro = ['A', '', ''];

  constructor(private usuarioService: UsuarioService, private confirmationService: ConfirmationService,
              private instituicaoService: InstituicaoService,  private loginService: LoginService
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
  }

  findAll() {
    this.usuarioService.findAll().subscribe(e => this.usuarios = e);
  }

  save() {

    if (this.hasRole('ADMIN')) {
      this.usuarioEdit.situacaoCadastro = this.statusCadastro[0];
    }

    this.usuarioService.save(this.usuarioEdit).subscribe(e => {
        this.usuarioEdit = new Usuario();
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
    this.usuarioEdit.orientador = this.usuarios[0];
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


