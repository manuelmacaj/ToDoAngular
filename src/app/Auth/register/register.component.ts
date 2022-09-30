import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CustomValidators } from 'src/app/custom-validators';
import { RegisterForm } from 'src/app/Interfaces/UserInterface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  REGEX_EMAIL = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"

  nameControl = new FormControl('', Validators.required)
  surnameControl = new FormControl('', Validators.required)
  emailControl = new FormControl('', [Validators.required, Validators.email])
  passwordControl = new FormControl('', Validators.required)
  confirmPasswordControl = new FormControl('', Validators.required)

  registrazioneFormBuilder = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    confirmPassword: this.confirmPasswordControl,
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  )

  constructor(private auth: AuthService, private router: Router, private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void { }

  onSubmit() {
    console.log(this.registrazioneFormBuilder)
    console.log(this.registrazioneFormBuilder.value)

    let registerForm: RegisterForm = {
      name: this.registrazioneFormBuilder.value.name!,
      surname: this.registrazioneFormBuilder.value.surname!,
      email: this.registrazioneFormBuilder.value.email!,
      password: this.registrazioneFormBuilder.value.password!,
    }
    this.auth.register(registerForm).subscribe(data => {
      alert("registrazione completata");
      this.router.navigate(['/insert']);
      this.dialogRef.close() // se la registrazione ha avuto successo, chiudo il dialog corrente
    })
  }

  //----------
  // serie di metodi utilizzati nel caso in cui i campi di registrazione risultino invalide

  getNameErrorMessage() {
    return this.nameControl.hasError('required') ? "Completare il campo" : "";
  }
  getSurnameErrorMessage() {
    return this.surnameControl.hasError('required') ? "Completare il campo" : "";
  }
  getEmailErrorMessage() {
    if (this.emailControl.hasError('required'))
      return 'Completare il campo';
    return this.emailControl.hasError('email') ? "Inserire in indirizzo email valida" : ""
  }
  getPasswordErrorMessage() {
    return this.passwordControl.hasError('required') ? "Completare il campo" : "";
  }
  getConfirmPasswordErrorMessage() {
    return this.passwordControl.hasError('required') ? "Completare il campo" : "";
  }
  getNotMatchPassword() {
    return this.passwordMatchError ? "Le due password non corrispondono" : ""
  }
  // fonte: https://aliasger.dev/quick-notes-implement-password-and-confirm-password-validation-in-angular
  get passwordMatchError() {
    return (
      this.registrazioneFormBuilder.getError('mismatch') &&
      this.registrazioneFormBuilder.get('confirmPassword')?.touched
    );
  }
  //----
}