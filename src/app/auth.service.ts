import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API_URL } from './evn';
import { LoginForm, User } from './Interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = `${API_URL}`
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {}
  constructor(private http: HttpClient, public router: Router) { }

  register(user: User): Observable<any> { // registrazione utente
    let url = `${this.endpoint}/register`;
    return this.http.post<any>(url, user);
  }

  login(userLogin: LoginForm) {
    let url = `${this.endpoint}/login`;
    return this.http.post<any>(url, userLogin).pipe(catchError(this.handleError))
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      alert("Errore lato client")
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.status == 500) { // errore 500
        console.log("Internal server error")
      }
      else if(error.status == 401) {
        console.log("Non autorizzato")
        alert("Credenziali errate")
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



