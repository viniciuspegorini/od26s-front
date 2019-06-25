import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Nota } from '../model/nota';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotaService extends CrudService<Nota, Number> {

  constructor(http: HttpClient) {
    super(environment.api + '/nota', http);
   }
}
