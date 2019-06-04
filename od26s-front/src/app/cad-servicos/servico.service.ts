import {Injectable} from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Servico} from '../model/servico';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends CrudService<Servico, number> {

  constructor(http: HttpClient) {
    const endpoint = environment.api + '/servico';
    super(endpoint, http);
  }
}
