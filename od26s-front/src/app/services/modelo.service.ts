import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Modelo} from '../model/modelo';

@Injectable({
  providedIn: 'root'
})
export class ModeloService extends CrudService<Modelo, number> {

  constructor( http: HttpClient) {
    super(environment.api + '/modelo', http);
  }
}
