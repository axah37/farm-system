import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Field, Task } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getFields(): Observable<HttpResponse<Field[]>> {
    return this.http.get<Field[]>("http://localhost:3000/fields", {observe: "response"})
  }

  getFieldById(id: string): Observable<HttpResponse<Field>> {
    return this.http.get<Field>(`http://localhost:3000/fields/${id}`, { observe: "response" }).pipe(
      catchError(this.handleError)
    )
  }

  addTask(id: string, task: Task): Observable<HttpResponse<Task>> {
    return this.http.post<Task>(`http://localhost:3000/fields/${id}`, task, { observe: "response" })
  }

  updateTask(id: string, task: Task): Observable<HttpResponse<Task>> {
    return this.http.put<Task>(`http://localhost:3000/fields/${id}`, task, { observe: "response" })
  }
}
