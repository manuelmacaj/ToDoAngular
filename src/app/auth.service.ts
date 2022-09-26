import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { API_URL } from './evn';
import { LoginForm, RegisterForm, User } from './Interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = `${API_URL}`
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: User = {
    name: '',
    surname: '',
    email: '',
    password: ''
  }
  constructor(private http: HttpClient, public router: Router) { }

  register(user: RegisterForm): Observable<any> { // registrazione utente
    let url = `${this.endpoint}/register`;
    return this.http.post<any>(url, user).pipe(catchError(this.handleError))
  }

  login(userLogin: LoginForm) { // login utente
    let url = `${this.endpoint}/login`;
    return this.http.post<any>(url, userLogin).subscribe((res: any) => {
      localStorage.setItem('access_token', res["access_token"]); // alloco l'access token nel localStorage
      this.getUser(userLogin.email).subscribe((data) => { // prelevo le informazioni dell'utente
        this.currentUser = data;
        this.router.navigate(['/']);
      });
    });
  }
  private getUser(email: string): Observable<any> {
    let url = `${this.endpoint}/user/${email}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn() {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  private handleError(error: HttpErrorResponse) { // errori
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
      else if (error.status == 400) { // errore 400
        alert("Email già esistente");
        console.log("Bad request")
      }
      else if (error.status == 401) {
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



