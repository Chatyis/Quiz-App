import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {
  readonly apiUrl = 'http://localhost:5000'; // TODO Move to env

  constructor(private http: HttpClient) {
  }

//TODO REFACTOR SO THIS HELPER WILL BE REMOVED
//   TODO MAIN PROBLEM IS THAT TYPING FOR GET MAY BE IMPOSSIBLE, WITHOUT THIS THERE WILL BE TYPING FOR http.get ...
  get(path: string, params?: HttpParams): Observable<Object> {
    return this.http.get(this.apiUrl + '/' + path, {params});
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + '/' + path, body);
  }
}
