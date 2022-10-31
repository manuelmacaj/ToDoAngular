import { HttpClient, HttpErrorResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { API_URL } from './env';

import { ToDoElem, ToDoElemIns, ToDoUpdate } from './Interfaces/toDoInterface';

// https://angular.io/guide/http

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient, public router: Router, private auth: AuthService, private snackBar: MatSnackBar) { }

  sendToDb(newElem: ToDoElemIns) { // POST method per inserire il un nuovo ToDo nel DB remoto
    if (this.auth.isLoggedIn) {
      let headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
      let options = { headers: headers_object }
      const url = `${API_URL}/user/${localStorage.getItem("id")}/todo/`;
      return this.http.post<any>(url, newElem, options)
        .pipe(catchError(this.handleError))
        .subscribe(_ => {
          this.snackBarView("To-Do salvato correttamente", "Ok");
        },
          _ => {
            this.auth.logout("Tentatp di creazione del To-Do fallito. Rieffettuare il login");
          })
    }
    else {
      this.snackBarView("Non sei autenticato, prova ad accedere e riprova", "Ok")
      return;
    }
  }

  getAllToDoList(): Observable<ToDoElem[]> { // GET method che restituisce tutti i ToDo salvati sul DB remoto
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
    let options = { headers: headers_object }
    const url = `${API_URL}/user/${localStorage.getItem("id")}/todo/`
    return this.http.get<any>(url, options).pipe(catchError(this.handleError));
  }

  getToDoByID(idTodo: number): Observable<ToDoElem> { // GET method che restituisce un ToDo selezionato dall'utente
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
    let options = { headers: headers_object }
    const url = `${API_URL}/user/${localStorage.getItem("id")}/todo/${idTodo}/`
    return this.http.get<ToDoElem>(url, options).pipe(retry(3), catchError(this.handleError));
  }

  updateTodo(updatedElem: ToDoElem): Observable<any> { // PATCH method 
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
    let options = { headers: headers_object }
    const url = `${API_URL}/user/${localStorage.getItem("id")}/todo/${updatedElem.id}/`
    const update_Elem: ToDoUpdate = {
      todo_text: updatedElem.todo_text,
      fatto: updatedElem.fatto
    };
    return this.http.patch<any>(url, update_Elem, options).pipe(retry(3), catchError(this.handleError));
  }

  deleteTodo(idTodo: number): Observable<any> { // DELETE method
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
    let options = { headers: headers_object }
    const url = `${API_URL}/user/${localStorage.getItem("id")}/todo/${idTodo}/`
    return this.http.delete<any>(url, options).pipe(retry(3), catchError(this.handleError));
  }

  private snackBarView(text: string, action: string) {
    this.snackBar.open(text, action, {
      duration: 3000, horizontalPosition: 'left'
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      alert("Errore lato client. Assicurarsi di essere connessi a Internet e riprova");
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.status == 500) { // errore 500: errore interno al server 
        alert(error.error["message"] + "\nStatus error: " + error.statusText);
      }
      else if (error.status == 401) { // errore 401: client non autorizzato (necessita di rieffettuare l'accesso)
        alert(error.error["message"] + "\nStatus error: " + error.statusText);
      }
      else if (error.status == 403) { // errore 403: Proibito!
        alert(error.error["message"] + "\nStatus error: " + error.statusText);
      }
      else if (error.status == 404) { // errore 404: elemento non trovato
        alert(error.error["message"] + "\nStatus error: " + error.statusText);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}