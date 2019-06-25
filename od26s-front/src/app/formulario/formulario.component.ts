// import {Component, OnInit, ViewChild} from '@angular/core';
// import {FormularioService} from './formulario.service';
// import {ConfirmationService, Message} from 'primeng/api';
// import {PessoaService} from '../pessoa/pessoa.service';
// import {Pessoa} from '../model/pessoa';
// import {Amostra} from '../model/amostra';
// import {Modelo} from '../model/modelo';
// import {Servico} from '../model/servico';
// import {Nota} from '../model/nota';
// import {Formulario} from '../model/formulario';
// import {DataTable} from 'primeng/primeng';
// import {NotaService} from './nota.service';
// import {ModeloService} from '../services/modelo.service';
// import * as ClassicEditorBuild from '@ckeditor/ckeditor5-angular';
// import {LoginService} from '../login/login.service';
// import {EquipamentoService} from '../cad-equipamento/equipamento.service';
// import {Equipamento} from '../model/equipamento';
// import {Usuario} from '../model/usuario';
//
// @Component({
//   selector: 'app-formulario',
//   templateUrl: './formulario.component.html',
//   styleUrls: ['./formulario.component.css']
// })
// export class FormularioComponent implements OnInit {
//
//   public editor = ClassicEditorBuild;
//
//   @ViewChild('dt') dataTable: DataTable;
//
//   msgs: Message[] = [];
//   formularioEdit = new Formulario();
//   showDialog = false;
//   equipamentoSelected = new Equipamento();
//   // orientadorEdit = new Pessoa;
//   modeloEdit = new Modelo();
//   selectedValue: string;
//   amostras: Amostra[];
//   modelos: Modelo[];
//   equipamentos: Equipamento[];
//   servicos: Servico[];
//   pessoas: Pessoa[] = [];
//   notas: Nota[];
//   usuario: Usuario;
//   pessoa: Pessoa;
//
//   constructor(private formularioService: FormularioService, private confirmationService: ConfirmationService,
//               private pessoaService: PessoaService, private notaService: NotaService,
//               private modeloService: ModeloService, private loginService: LoginService,
//               private equipamentoService: EquipamentoService
//   ) {
//   }
//
//   ngOnInit() {
//     this.pessoas = [];
//     this.formularioEdit = new Formulario();
//     this.formularioEdit.pessoa = new Pessoa();
//     this.formularioEdit.modelo = new Modelo();
//     this.formularioEdit.pessoa.usuario = new Usuario();
//     // this.equipamentoSelected = new Equipamento();
//     this.carregaUsuario();
//   }
//
//   carregaUsuario() {
//     this.formularioService.getLoggedUser().subscribe(e => {
//       this.usuario = e;
//       this.carregarCombos();
//       this.modeloEdit = new Modelo();
//       if (this.hasRole('ADMIN')) {
//         // carrega o this.formularioEdit.pessoa
//         this.pessoaService.findAll().subscribe(p => {
//           this.pessoas = p;
//           console.log(this.pessoas);
//           this.formularioEdit.pessoa = this.pessoas[0];
//           console.log(this.formularioEdit);
//         });
//       } else {
//         this.formularioService.findByUsuarioId(this.usuario.id).subscribe(pessoa => {
//           this.formularioEdit.pessoa = pessoa;
//           this.formularioEdit.pessoa.usuario = this.usuario;
//         });
//       }
//     });
//   }
//
//   hasRole(permissao: string) {
//     return this.loginService.hasRole(permissao);
//   }
//
//   carregarCombos() {
//     this.modeloService.findAll().subscribe(e => {
//       this.modelos = e;
//     });
//     this.equipamentoService.findAll().subscribe(e => {
//       this.equipamentos = e;
//       this.equipamentoSelected = this.equipamentos[0];
//     });
//   }
//
//   newEntity() {
//     this.showDialog = true;
//   }
//
//   cancel() {
//     this.showDialog = false;
//     this.formularioEdit = new Formulario();
//   }
//
//   save() {
//     this.formularioEdit.status = 'Solicitado';
//
//     if (this.hasRole('ADMIN')) {
//       this.formularioEdit.pessoa = this.pessoas[0];
//     }
//
//     this.formularioEdit.modelo = this.modeloEdit;
//
//     this.formularioService.save(this.formularioEdit).subscribe(e => {
//
//         if (this.hasRole('ADMIN')) {
//           this.formularioEdit = new Formulario();
//           this.formularioEdit.pessoa = new Pessoa();
//           this.formularioEdit.pessoa.usuario = new Usuario();
//         }
//
//         this.formularioEdit.modelo = new Modelo();
//         this.formularioEdit.naturezaOperacao = '';
//
//         this.msgs = [{
//           severity: 'sucess', summary: 'Confirmado',
//           detail: 'Formulário salvo com sucesso!'
//         }];
//       },
//       error => {
//         this.msgs = [{severity: 'error', summary: 'Erro', detail: 'Falha ao salvar  registro!'}];
//       }
//     );
//
//   }
//
//   onSelectionType(event) {
//     if (event) {
//       if (this.selectedValue) {
//         this.formularioEdit.naturezaOperacao = this.selectedValue;
//       } else {
//         this.formularioEdit.naturezaOperacao = '';
//       }
//     }
//   }
//
//   selectModelo() {
//     if (this.equipamentoSelected) {
//       this.modeloService.findEquipamento(this.equipamentoSelected.id).subscribe(e => this.modeloEdit = e);
//     }
//   }
// }
