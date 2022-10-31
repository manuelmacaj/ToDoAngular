import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';

import { API_URL } from './env';
import { LoginForm, RegisterForm } from './Interfaces/UserInterface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = `${API_URL}`
  constructor(private http: HttpClient, public router: Router, private snackBar: MatSnackBar) { }

  register(user: RegisterForm): Observable<any> { // registrazione utente
    let url = `${this.endpoint}/sign-up/`;
    return this.http.post<any>(url, user).pipe(catchError(this.handleError))
  }

  login(userLogin: LoginForm) { // login utente
    let url = `${this.endpoint}/sign-in/`;
    return this.http.post<LoginForm>(url, userLogin).pipe(
      tap(data => {
        return data
      }),
      catchError(this.handleError),
    )
  }

  getUser(user_id: number): Observable<any> { // prelevo l'info utente
    let url = `${this.endpoint}/user/${user_id}/`;
    return this.http.get(url).pipe(catchError(this.handleError))
  }

  getToken() { // restituisco il token
    return localStorage.getItem("access_token");
  }

  get isLoggedIn() { // verifico se l'utente è loggato
    let authToken = localStorage.getItem("access_token");
    return authToken !== null ? true : false;
  }

  logout(message: string) {
    localStorage.clear(); // pulisco il localStorage 
    this.router.navigate(['/insert']); // riporto l'utente nella sezione inserimento 
    this.snackBarView(message, "Ok")
  }
  snackBarView(text: string, action: string) {
    this.snackBar.open(text, action, {
      duration: 3000, horizontalPosition: 'left'
    });
  }

  private handleError(error: HttpErrorResponse) { // errori

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      alert("Errore lato client. Assicurarsi di essere connessi a Internet");
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.status == 500) {
        alert(error.error["message"] + "\nStatus error: " + error.statusText);
      }
      else if (error.status == 502) {
        alert(error.error["message"] + "\nStatus error: " + error.statusText);
      }
      else if (error.status == 404) {
        alert(error.error["message"] + "\nStatus error: " + error.statusText);
      }
      else if (error.status == 401) { // errore 401: client non autorizzato
        alert(error.error["message"] + "\nStatus error: 401");
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}