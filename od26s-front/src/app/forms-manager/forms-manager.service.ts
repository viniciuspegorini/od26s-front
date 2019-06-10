import {Injectable} from '@angular/core';
import {CrudService} from "../generic/crud.service";
import {Formulario} from "../model/formulario";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FormsManagerService extends CrudService<Formulario, number> {

  constructor(http: HttpClient) {
    const endpoint = environment.api + '/formularios';
    super(endpoint, http);
  }
}
