import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToDoService } from 'src/app/to-do.service';
import { ToDoElem } from 'src/app/Interfaces/toDoInterface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {

  toDoSelected: ToDoElem = {
    id: 0,
    todo_text: '',
    current_time: '',
  };

  textTodo: string = '';
  todoStatus = [true, false];
  checkStatus: boolean = false

  constructor(private route: ActivatedRoute, private location: Location, private todoService: ToDoService, private snackBar: MatSnackBar, protected auth: AuthService) {
  }

  ngOnInit(): void {
    this.getToDoByID();
  }
  
  getToDoByID() { // funzione di prelevamento di un ToDo, in base all'ID 
    const ID = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getToDoByID(ID).subscribe({
      next: data => this.takeToDoSelected(data),
      error: _ => this.auth.logout("Tentativo di accesso al To-Do selezionato fallito, rieffettuare il login.")
    })
  }

  private takeToDoSelected(data: ToDoElem) {
    this.toDoSelected = data;
    this.checkStatus = this.toDoSelected.fatto!;
    this.toDoSelected.current_time = new Date(this.toDoSelected.current_time).toISOString().split('T')[0];
    this.textTodo = this.toDoSelected.todo_text;
  }
  
  updateTodo() { // funzione per l'aggiornamento di un todo
    if (this.textTodo == '') {
      this.snackBarView("Non è possibile aggiornare, il campo To-Do è vuoto", "Ok");
      return;
    }
    this.toDoSelected.todo_text = this.textTodo;
    this.toDoSelected.fatto = this.checkStatus;
    this.todoService.updateTodo(this.toDoSelected).subscribe({
      next: _ => this.updateCompletedFunc(),
      error: _ => this.auth.logout("Tentativo di aggiornamento fallito, rieffettuare il login.")
    })
  }

  deleteTodo() { // funzione per la cancellazione di un todo
    this.todoService.deleteTodo(this.toDoSelected.id).subscribe({
      next: _ => this.deleteSuccessFunc(),
      error: _ => this.auth.logout("Tentativo di cancellazione fallito, rieffettuare il login.")
    })
  }

  private updateCompletedFunc() { // funzione chiamata nel caso in cui l'aggiornamento ha avuto effetto
    this.snackBarView("Aggiornamento eseguito con successo.", "Ok");
    this.goBack();
  }
  private deleteSuccessFunc() { // funzione chiamata nel caso in cui la cancellazione ha avuto effetto
    this.snackBarView("Cancellazione eseguito con successo.", "Ok");
    this.goBack();
  }

  logout() {
    this.auth.logout("Logout completato.");
  }

  goBack() { // funzione per tornare alla pagina precedente
    this.location.back();
  }

  private snackBarView(text: string, action: string) { // funzione per la creazione di uno snackbar
    this.snackBar.open(text, action, {
      duration: 3000, horizontalPosition: 'left'
    });
  }
}

