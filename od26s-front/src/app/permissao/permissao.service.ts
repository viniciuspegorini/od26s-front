import { Injectable } from '@angular/core';
import { Permissao } from '../model/permissao';
import { CrudService } from '../generic/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends CrudService< Permissao, number> {

  constructor( http: HttpClient) {
    super(environment.api + '/permissao', http);
  }
}
