import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CrudService} from '../generic/crud.service';
import {Usuario} from '../model/usuario';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/usuario', http);
  }

  save(t: Usuario): Observable<void> {
    // const url = `${this.getUrl()}/salvar`;
    const url = `${this.getUrl()}`;
    return this.http.post<void>(url, JSON.stringify(t), httpOptions);
  }

}
