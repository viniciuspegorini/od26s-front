import {Injectable} from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Amostra} from '../model/amostra';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmostraService extends CrudService<Amostra, number>{

  constructor( http: HttpClient) {
    super(environment.api + '/amostra', http);
  }
}
