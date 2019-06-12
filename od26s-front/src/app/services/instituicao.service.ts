import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Instituicao} from '../model/instituicao';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService  extends CrudService<Instituicao, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/instituicao', http);
  }
}

