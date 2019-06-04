import { Injectable } from '@angular/core';
import {Formulario} from '../model/formulario';
import { CrudService } from '../generic/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormularioService extends CrudService<Formulario, number> {

  constructor( http: HttpClient) {
    super(environment.api + '/forumario', http);
  }

}


