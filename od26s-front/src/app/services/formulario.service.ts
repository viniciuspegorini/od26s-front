import {Injectable} from '@angular/core';
import {Formulario} from '../model/formulario';
import {CrudService} from '../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class FormularioService extends CrudService<Formulario, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/formulario', http);
  }

  getLoggedUser(): Observable<Usuario> {
    const url = `${environment.api}/logged-user`;
    return this.http.get<Usuario>(url);
  }

  findByUsuarioId(Id: number): Observable<Usuario> {
    const url = `${environment.api}/usuario/${Id}`;
    return this.http.get<Usuario>(url);
  }

}
