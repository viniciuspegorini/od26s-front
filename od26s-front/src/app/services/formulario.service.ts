import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Equipamento } from '../model/equipamento';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormularioService extends CrudService<Equipamento, Number> {

  constructor(http: HttpClient) {
    super(environment.api + '/formulario', http);
   }
}
