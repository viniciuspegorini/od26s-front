import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Permissao } from '../model/permissao';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends CrudService<Permissao, Number> {

  constructor(http: HttpClient) {
    super(environment.api + '/permissao', http);
   }
}
