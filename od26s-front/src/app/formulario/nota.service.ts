import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Nota} from '../model/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService extends CrudService <Nota, number> {

  constructor( http: HttpClient) {
    super(environment.api + '/nota', http);
  }
}
