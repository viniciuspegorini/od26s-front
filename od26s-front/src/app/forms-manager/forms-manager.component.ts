import {Component, OnInit} from '@angular/core';
import {Pessoa} from "../model/pessoa";
import {PessoaService} from "../pessoa/pessoa.service";

@Component({
  selector: 'app-forms-manager',
  templateUrl: './forms-manager.component.html',
  styleUrls: ['./forms-manager.component.css']
})
export class FormsManagerComponent implements OnInit {

  usuarioEdit: Pessoa;

  constructor(private pessoaService: PessoaService) {
  }

  ngOnInit() {
  }

  showDialogValidateUser(id: number) {
    this.pessoaService.findOne(id).subscribe(pessoa => {
      console.log(pessoa);
    });
  }

}
