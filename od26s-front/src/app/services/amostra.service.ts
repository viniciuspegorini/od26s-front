import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Amostra } from '../model/amostra';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmostraService extends CrudService<Amostra, Number> {

  constructor(http: HttpClient) { 
    super(environment.api + '/amostra', http);
  }
}
