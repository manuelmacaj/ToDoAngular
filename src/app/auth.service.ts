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
  constructor(private http: HttpClient, public router: Router) { }

  register(user: RegisterForm): Observable<any> { // registrazione utente
    let url = `${this.endpoint}/sign-up/`;
    return this.http.post<any>(url, user).pipe(catchError(this.handleError))
  }

  login(userLogin: LoginForm) { // login utente
    let url = `${this.endpoint}/sign-in/`;
    return this.http.post<any>(url, userLogin).subscribe((res: any) => {
      localStorage.removeItem('access_token')
      localStorage.setItem('access_token', res["access_token"]); // alloco l'access token nel localStorage
      this.getUser(res["id"]).subscribe((data) => { // prelevo le informazioni dell'utente
        console.table(data)
        alert("Accesso eseguito")
        // local storage
        localStorage.setItem("id", String(data["id"]));
        localStorage.setItem("name", String(data["name"]));
        localStorage.setItem("surname", String(data["surname"]));
        localStorage.setItem("email", String(data["email"]))
        this.router.navigate(['/']);
      });
    });
  }

  private getUser(user_id: number): Observable<any> {
    let url = `${this.endpoint}/user/${user_id}/`;
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
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}



