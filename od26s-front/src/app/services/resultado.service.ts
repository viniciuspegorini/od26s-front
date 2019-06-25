import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Resultado } from '../model/resultado';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService extends CrudService<Resultado, Number> {

  constructor(http: HttpClient) {
    super(environment.api + '/resultado', http);
   }
}
