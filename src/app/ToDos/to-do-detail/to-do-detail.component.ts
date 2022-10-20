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

  todoStatus = [true, false];
  checkStatus: boolean = false

  constructor(private route: ActivatedRoute, private location: Location, private todoService: ToDoService, private snackBar: MatSnackBar, protected auth: AuthService) {
  }

  ngOnInit(): void {
    this.getToDoByID();
  }
  getToDoByID() { // funzione di prelevamento di un ToDo, in base all'ID 
    const ID = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getToDoByID(ID).subscribe(data => {
      this.toDoSelected = data;
      this.checkStatus = this.toDoSelected.fatto!;
      this.toDoSelected.current_time = new Date(this.toDoSelected.current_time).toISOString().split('T')[0];
    })
  }
  goBack() { // funzione per tornare alla pagina precedente
    this.location.back();
  }
  updateTodo() { // funzione per l'aggiornamento di un todo
    this.toDoSelected.fatto = this.checkStatus;
    this.todoService.updateTodo(this.toDoSelected).subscribe(_ => {
      this.snackBarView("Aggiornamento eseguito con successo.", "Ok");
      this.goBack();
    }, 
    _ => {
      this.auth.logout("Tentativo di aggiornamento fallito, rieffettuare il login.");
    })
  }
  deleteTodo() { // funzione per la cancellazione di un todo
    this.todoService.deleteTodo(this.toDoSelected.id).subscribe(_ => {
      this.snackBarView("Cancellazione eseguito con successo.", "Ok");
      this.goBack();
    }, 
    _ => {
      this.auth.logout("Tentativo di cancellazione fallito, rieffettuare il login.");
    })
  }
  logout() {
    this.auth.logout("Logout completato.");
  }

  private snackBarView(text: string, action: string) {
    this.snackBar.open(text, action, {
      duration: 3000, horizontalPosition:'left'
    });
  }
}
