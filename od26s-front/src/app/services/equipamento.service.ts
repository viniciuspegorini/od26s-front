import { Injectable } from '@angular/core';
import {CrudService} from "../generic/crud.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Equipamento} from "../model/equipamento";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService extends CrudService<Equipamento, number>{

  constructor(http : HttpClient) {
    super(environment.api + '/equipamento', http);
  }
}
