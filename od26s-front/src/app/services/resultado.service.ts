import {Injectable} from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Resultado} from '../model/resultado';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService extends CrudService<Resultado, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/resultado', http);
  }

  download(id: number, content: string): Observable<any> {
    const url = `${this.getUrl()}/download/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': content
      })
    };
    return this.http.get<any>(url, {responseType: 'blob' as 'json'});
  }

  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  downloadFile(data: any, content: string, fileName: string) {
    const binaryData = [];
    binaryData.push(data);
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: content}));
    if (fileName) {
      downloadLink.setAttribute('download', fileName);
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
