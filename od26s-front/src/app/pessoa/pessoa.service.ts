import { Injectable } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { CrudService } from '../generic/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PessoaService extends CrudService< Pessoa, number>{

  constructor( http: HttpClient) {
    super(environment.api + '/pessoa', http);
  }


}
