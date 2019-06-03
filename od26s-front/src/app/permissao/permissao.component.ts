import { Component, OnInit } from '@angular/core';
import { Permissao } from '../model/permissao';
import { CrudService } from '../generic/crud.service';
import {ConfirmationService, LazyLoadEvent, Message, SelectItem} from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {DataTable} from 'primeng/components/datatable/datatable';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.css']
})

export class PermissaoService extends CrudService< Permissao, number> {

  constructor( http: HttpClient) {
    super(environment.api + '/permissao', http);
  }


}



