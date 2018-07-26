import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  apiURL: any = 'http://localhost:8082/';
  /*apiURL: any = 'http://172.24.190.90:8081/';*/

  constructor(private http: HttpClient) { }
  getMethod(url, data): Observable<any> {
    return this.http.get(this.apiURL+ url, data);
  }
  postMethod(url, data): Observable<any> {
    return this.http.post(this.apiURL+ url, data);
  }
  putMethod(url, data): Observable<any> {
    return this.http.put(this.apiURL+ url, data);
  }
}
