import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToDoService } from '../to-do.service';
import { ToDoElem } from '../Interfaces/toDoInterface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {

  toDoSelected: ToDoElem = {
    idTodo: 0,
    toDoText: '',
    currentTime: '',
  };
  todoStatus = [true, false];
  checkStatus: boolean = false

  constructor(private route: ActivatedRoute, private location: Location, private todoService: ToDoService) {
  }

  ngOnInit(): void {
    this.getToDoByID();
  }
  getToDoByID() { // funzione di prelevamento di un ToDo, in base all'ID 
    const ID = Number(this.route.snapshot.paramMap.get('idTodo'));
    this.todoService.getToDoByID(ID).subscribe(data => {
      this.toDoSelected = data;
      this.checkStatus = this.toDoSelected.fatto!
    })
  }
  goBack() { // funzione per tornare alla pagina precedente
    this.location.back();
  }
  updateTodo() { // funzione per l'aggiornamento di un todo
    this.toDoSelected.fatto = this.checkStatus;
    this.todoService.updateTodo(this.toDoSelected).subscribe(data => {
      alert(data["message"]);
      this.goBack();
    })
  }
  deleteTodo() { // funzione per la cancellazione di un todo
    this.todoService.deleteTodo(this.toDoSelected.idTodo).subscribe(data => {
      alert(data["message"]);
      this.goBack();
    })
  }
}
