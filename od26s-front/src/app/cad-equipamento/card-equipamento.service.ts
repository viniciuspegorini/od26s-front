import {Injectable} from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Equipamento} from '../model/equipamento';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardEquipamentoService extends CrudService<Equipamento, number> {

  constructor(http: HttpClient) {
    const endpoint = environment.api + '/equipamento';
    super(endpoint, http);
  }
}
