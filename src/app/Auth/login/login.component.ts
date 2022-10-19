import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LoginForm } from 'src/app/Interfaces/UserInterface';
import { RegisterComponent } from '../register/register.component';

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
    public router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.loginWorking = true
    let userLogin: LoginForm = {
      email: this.userLoginFormBuilder.value.email!,
      password: this.userLoginFormBuilder.value.password!
    };
    this.authService.login(userLogin).subscribe((res: any) => {
      localStorage.setItem('access_token', res["access_token"]); // alloco l'access token nel localStorage
      this.authService.getUser(res["id"]).subscribe((data) => {
        this.snackBarView("Accesso eseguito", "Ok");
        localStorage.setItem("id", String(data["id"]));
        localStorage.setItem("name", String(data["name"]));
        localStorage.setItem("surname", String(data["surname"]));
        localStorage.setItem("email", String(data["email"]));
        this.loginWorking = false;
        this.dialogRef.close();
        this.router.navigate(['/']);
      })
    });
  }

  getEmailErrorMessage() {
    if (this.emailControl.hasError('required'))
      return 'Completare il campo';
    return this.emailControl.hasError('email') ? "Inserire in indirizzo email valida" : ""
  }
  getPasswordErrorMessage() {
    return this.passwordControl.hasError('required') ? "Completare il campo" : "";
  }

  snackBarView(text: string, action: string) {
    this.snackBar.open(text, action, {
      duration: 3000, horizontalPosition: 'left'
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true; // l'unico modo per chiudere la finestra di dialogo è tramite 
    dialogConfig.autoFocus = true;

    this.dialog.open(RegisterComponent, dialogConfig) // apro il dialog specificando il Component e le configurazioni
  }
}