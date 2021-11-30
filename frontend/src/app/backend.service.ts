import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Field } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getFields(): Observable<HttpResponse<Field[]>> {
    return this.http.get<Field[]>("http://localhost:3000/fields", {observe: "response"})
  }
}
