import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Formulario} from '../model/formulario';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Amostra} from '../model/amostra';

@Injectable({
  providedIn: 'root'
})
export class AmostraService extends CrudService<Amostra, number> {

  constructor( http: HttpClient) {
    super(environment.api + '/amostra', http);
  }

}
