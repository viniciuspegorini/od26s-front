import { Injectable } from '@angular/core';
import {CrudService} from "../generic/crud.service";
import {Preco} from "../model/preco";
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrecoService extends CrudService<Preco, number>{

  constructor(http : HttpClient) {
    super(environment.api + '/preco', http);
  }
}
