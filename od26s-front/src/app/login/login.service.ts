import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AccessToken } from './access.token';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService implements CanActivate {

  userInfo: any;
  isAuthenticated = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = `${environment.api}/user-info`;
    return this.http.get(url)
      .pipe(
        map(e => {
          this.userInfo = e;
          this.isAuthenticated.next(true);
          return true;
        }),
        catchError(err => {
          this.logout();
          return throwError(new Error('O usuário não está autenticado'));
        })
      );
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  hasRole(role: string): boolean {
    if (this.getUserInfo() && this.getUserInfo().authorities) {
      return this.getUserInfo().authorities.filter(e => e.nome === 'ROLE_' + role).length > 0;
    } else {
      return false;
    }
  }

  logout() {
    Object.keys(new AccessToken()).forEach(key => localStorage.removeItem(key));
    this.isAuthenticated.next(false);
    this.userInfo = null;
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  login(username: string, password: string): Observable<AccessToken> {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`app:utfpr`)
    });

    return this.http.post<AccessToken>(`${environment.api}/oauth/token`, params.toString(), { headers })
      .pipe(
        map(e => {
          Object.keys(e).forEach(key => localStorage.setItem(key, e[key]));
          this.isAuthenticated.next(true);
          return e;
        })
      );
  }

}
