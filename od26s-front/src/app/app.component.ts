import {Component, OnInit} from '@angular/core';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  isAuthenticated = false;

  constructor(private loginService: LoginService) {
    this.loginService.isAuthenticated.asObservable().subscribe(e => this.isAuthenticated = e);
  }

  hasRole(role: string): boolean {
    return this.loginService.hasRole(role);
  }

  get userInfo(): any {
    return this.loginService.getUserInfo();
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }
}
