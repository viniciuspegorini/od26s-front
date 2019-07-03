import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Usuario} from '../model/usuario';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/usuario', http);
  }

}
