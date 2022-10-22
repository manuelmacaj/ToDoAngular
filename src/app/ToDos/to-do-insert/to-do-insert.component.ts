
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';
import { LoginComponent } from 'src/app/Auth/login/login.component';
import { ToDoElemIns } from 'src/app/Interfaces/toDoInterface';
import { ToDoService } from 'src/app/to-do.service';

@Component({
  selector: 'app-to-do-insert',
  templateUrl: './to-do-insert.component.html',
  styleUrls: ['./to-do-insert.component.css']
})
export class ToDoInsertComponent implements OnInit {

  textTodo: string = '';
  lengthTodo: Number = 0;

  toDoElem: ToDoElemIns = {
    todo_text: '',
    current_time: '',
  }

  constructor(private toDoService: ToDoService, protected auth: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void { }


  takeToDo() { // prelevo il todo dal
    if (this.textTodo == '') { // se è vuoto, mi fermo
      this.snackBarView('Inserire il To-Do', 'Ok');
      return;
    }
    this.costruisciToDo()
    this.toDoService.sendToDb(this.toDoElem)
    this.textTodo = ""
  }

  costruisciToDo() {
    this.toDoElem.todo_text = this.textTodo;
    this.toDoElem.current_time = new Date().toISOString();
    this.toDoElem.fatto = false; // di default è false
  }

  loginDialog() { // finestra dialogo Angular Material
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // l'unico modo per chiudere la finestra di dialogo è tramite 
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent, dialogConfig) // apro il dialog specificando il Component e le configurazioni
  }

  logout() {
    this.auth.logout("Logout compleato.");
  }
  private snackBarView(text: string, action: string) {
    this.snackBar.open(text, action, {
      duration: 3000, horizontalPosition: 'left'
    });
  }
}
