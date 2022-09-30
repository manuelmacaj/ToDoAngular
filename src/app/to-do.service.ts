import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserService } from './config.service';
import { API_URL, TODOS } from './evn';

import { ToDoElem, ToDoElemIns } from './Interfaces/toDoInterface';

// https://angular.io/guide/http

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient, public router: Router) { }

  sendToDb(newElem: ToDoElemIns) { // POST method per inserire il un nuovo ToDo nel DB remoto
    if (localStorage.getItem("access_token")) {
      let headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));
      let options = { headers: headers_object }
      const url = `${API_URL}/user/${localStorage.getItem("id")}/todo/`;
      return this.http.post<any>(url, newElem, options).subscribe(_ => {
        alert("Dato inserito correttamente");
      })
    }
    else {
      alert("Accedi");
      return;
    }
  }

  getAllToDoList(): Observable<any> { // GET method che restituisce tutti i ToDo salvati sul DB remoto
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));
    let options = { headers: headers_object }
    const url = `${API_URL}/user/${localStorage.getItem("id")}/todo/`
    return this.http.get<any>(url, options).pipe(catchError(this.handleError));
  }

  getToDoByID(idTodo: number): Observable<ToDoElem> { // GET method che restituisce un ToDo selezionato dall'utente
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));
    let options = { headers: headers_object }
    const url = `${API_URL}/user/${localStorage.getItem("id")}/todo/${idTodo}/`
    return this.http.get<ToDoElem>(url, options).pipe(retry(3), catchError(this.handleError));
  }

  updateTodo(updatedElem: ToDoElem): Observable<any> { // PATCH method 
    const url = ``
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
      else if (error.status == 404) { // errore 404
        console.log("Pagina non trovata");
      }
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}