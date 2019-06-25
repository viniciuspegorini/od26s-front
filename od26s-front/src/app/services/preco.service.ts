import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Preco } from '../model/preco';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrecoService extends CrudService<Preco, Number> {

  constructor(http: HttpClient) { 
    super(environment.api + '/preco', http);
  }
}
