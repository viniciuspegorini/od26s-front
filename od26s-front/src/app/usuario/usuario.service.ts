import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CrudService} from '../generic/crud.service';
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/usuario', http);
  }

}
