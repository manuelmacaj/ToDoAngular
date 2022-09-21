import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { API_URL, TODOS } from './evn';
import { ToDoElem } from './Interfaces/toDoInterface';

// https://angular.io/guide/http

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  constructor(private http: HttpClient) { }

  sendToDb(newElem: ToDoElem) { // POST method per inserire il un nuovo ToDo nel DB remoto
    const url = `${API_URL}${TODOS}`
    return this.http.post(url, newElem)
  }

  getAllToDoList(): Observable<any> { // GET method che restituisce tutti i ToDo salvati sul DB remoto
    const url = `${API_URL}${TODOS}`
    return this.http.get<any>(url).pipe(retry(3), catchError(this.handleError));
  }

  getToDoByID(idTodo: number): Observable<ToDoElem> { // GET method che restituisce un ToDo selezionato dall'utente
    const url = `${API_URL}${TODOS}/${idTodo}`
    return this.http.get<ToDoElem>(url).pipe(retry(3), catchError(this.handleError));
  }

  updateTodo(updatedElem: ToDoElem): Observable<any> { // PATCH method 
    const url = `${API_URL}${TODOS}/${updatedElem.idTodo}`
    return this.http.patch<any>(url, updatedElem).pipe(retry(3), catchError(this.handleError));
  }

  deleteTodo(idTodo: number): Observable<any> { // DELETE method
    const url = `${API_URL}${TODOS}/${idTodo}`;
    return this.http.delete<any>(url).pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.status == 500) { // errore 500
        console.log("Internal server error")
      }
      else if (error.status == 409) { // errore 409 
        console.log("Conflitto")
      }
      else if (error.status == 404){ // errore 404
        console.log("Pagina non trovata");
      }
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}