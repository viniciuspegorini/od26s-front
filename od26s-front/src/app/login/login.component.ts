import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Message} from 'primeng/api';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  msgs: Message[] = [];

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginService.isAuthenticated.next(false);
  }

  login() {
    this.loginService.loggin(this.username, this.password).subscribe(e => {
      this.msgs = [{
        severity: 'success',
        summary: 'Seja Bem Vindo!!',
        detail: 'Usuário Logado com Sucesso!!'
      }];
      setTimeout(() => {
        this.router.navigate(['/modelo']);
      }, 2000);
    }, error => {
      // alert(error.error.error_description);
      this.msgs = [{
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuário e/ou senha incorreto(s)!'
      }];
    });
  }
}
