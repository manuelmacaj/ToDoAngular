import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CustomValidators } from 'src/app/custom-validators';
import { RegisterForm } from 'src/app/Interfaces/UserInterface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  REGEX_EMAIL = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"

  nameControl = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(1)]);
  surnameControl = new FormControl('', [Validators.required, Validators.maxLength(80)]);
  emailControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.REGEX_EMAIL)]);
  passwordControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  confirmPasswordControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  signupLoading = false;
  registerSub: Subscription | undefined

  registrazioneFormBuilder = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    confirmPassword: this.confirmPasswordControl,
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );

  constructor(private auth: AuthService, private router: Router, private dialogRef: MatDialogRef<RegisterComponent>, private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe;
  }

  onSubmit() {
    let registerForm: RegisterForm = {
      name: this.registrazioneFormBuilder.value.name!,
      surname: this.registrazioneFormBuilder.value.surname!,
      email: this.registrazioneFormBuilder.value.email!,
      password: this.registrazioneFormBuilder.value.password!,
    }
    this.disableFields();
    this.registerSub = this.auth.register(registerForm).subscribe({
      next: _ => this.confirmRegistration(),
      error: _ => this.enableFields()
    })
  }

  private confirmRegistration() {
    this.snackBarView("Registrazione completata. ora Accedi", "Ok");
    this.signupLoading = false;
    this.dialogRef.close() // chiusura finestra di riferimento
  }

  private snackBarView(text: string, action: string) {
    this.snackBar.open(text, action, {
      duration: 3000, horizontalPosition: 'left'
    });
  }

  private disableFields() {
    this.signupLoading = true;
    this.registrazioneFormBuilder.controls["name"].disable;
    this.registrazioneFormBuilder.controls["surname"].disable;
    this.registrazioneFormBuilder.controls["email"].disable;
    this.registrazioneFormBuilder.controls["password"].disable;
    this.registrazioneFormBuilder.controls["confirmPassword"].disable;
  }
  private enableFields() {
    this.signupLoading = false;
    this.registrazioneFormBuilder.controls["name"].enable;
    this.registrazioneFormBuilder.controls["surname"].enable;
    this.registrazioneFormBuilder.controls["email"].enable;
    this.registrazioneFormBuilder.controls["password"].enable;
    this.registrazioneFormBuilder.controls["confirmPassword"].enable;
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