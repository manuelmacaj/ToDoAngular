import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { LoginForm } from 'src/app/Interfaces/UserInterface';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: LoginForm = ({
    email: '',
    password: ''
  })

  constructor(protected authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void { }

  onSubmit() {
    this.authService.login(this.userLogin)
  }
  
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true; // l'unico modo per chiudere la finestra di dialogo è tramite 
    dialogConfig.autoFocus = true;

    this.dialog.open(RegisterComponent, dialogConfig) // apro il dialog specificando il Component e le configurazioni
  }
}