import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LoginForm } from 'src/app/Interfaces/UserInterface';
import { RegisterComponent } from '../register/register.component';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailControl = new FormControl('', [Validators.required, Validators.email])
  passwordControl = new FormControl('', Validators.required)

  userLoginFormBuilder = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  })
  loginWorking = false;

  constructor(protected authService: AuthService, private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>, private snackBar: MatSnackBar,
    public router: Router, private cookieService: CookieService) { }

  ngOnInit(): void { }

  onSubmit() {
    let userLogin: LoginForm = { // costruisco userLogin di tipo Login form, prelevando le info dalla form
      email: this.userLoginFormBuilder.value.email!,
      password: this.userLoginFormBuilder.value.password!
    };
    this.disableFields(); // diabilito i fields e abilito la progress bar di Angula Material
    this.authService.login(userLogin).subscribe({
      next: (res: any) => this.saveLocalStorage(res),
      error: (_) => this.loginFailed()
    });
  }

  private saveLocalStorage(res: any) {
    // in caso di successo, proseguo
    this.cookieService.set('access_token', res["access_token"]); // alloco l'access token nei cookie
    this.authService.getUser(res["id"]).subscribe((data) => {
      this.snackBarView("Accesso eseguito", "Ok");
      localStorage.setItem("id", String(data["id"]));
      localStorage.setItem("name", String(data["name"]));
      localStorage.setItem("surname", String(data["surname"]));
      localStorage.setItem("email", String(data["email"]));
      this.loginWorking = false; // disabilito la progress bar
      this.dialogRef.close(); // chiudo il mat dialog
      this.router.navigate(['/']);
    });
  }

  private loginFailed() {
    this.enableFields();
    this.userLoginFormBuilder.reset();
  }

  getEmailErrorMessage() { // funzione che mostra nel tag <mat-error> il messaggio d'errore per l'email
    if (this.emailControl.hasError('required'))
      return 'Completare il campo';
    return this.emailControl.hasError('email') ? "Inserire in indirizzo email valida" : ""
  }
  getPasswordErrorMessage() { // funzione che mostra nel <mat-error> il messaggio d'errore per la password
    return this.passwordControl.hasError('required') ? "Completare il campo" : "";
  }

  private disableFields() { // funzione per disabilitare i fields presenti nel <mat-dialog>
    this.loginWorking = true;
    this.userLoginFormBuilder.controls["email"].disable();
    this.userLoginFormBuilder.controls["password"].disable();
  }
  private enableFields() { // funzione per abilitare i fields presenti nel <mat-dialog>
    this.loginWorking = false;
    this.userLoginFormBuilder.controls["email"].enable();
    this.userLoginFormBuilder.controls["password"].enable();
  }

  snackBarView(text: string, action: string) {
    this.snackBar.open(text, action, {
      duration: 3000, horizontalPosition: 'left'
    });
  }

  openDialog() { // apertura della finestra di dialogo per la registrazione dell'utente
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true; // l'unico modo per chiudere la finestra di dialogo è tramite 
    dialogConfig.autoFocus = true;

    this.dialog.open(RegisterComponent, dialogConfig) // apro il dialog specificando il Component e le configurazioni
  }
}