import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToDoElem } from '../Interfaces/toDoInterface';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do-insert',
  templateUrl: './to-do-insert.component.html',
  styleUrls: ['./to-do-insert.component.css']
})
export class ToDoInsertComponent implements OnInit {
  textTodo: string = '';
  lengthTodo: Number = 0;

  toDoElem: ToDoElem = {
    idTodo: Number(999),
    toDoText: '',
    currentTime: '',
  }
  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void { }

  takeToDo() {
    if (this.textTodo == '') { // se è vuoto, mi fermo
      alert("Inserire to-do");
      return;
    }
    this.costruisciToDo()
    this.toDoService.sendToDb(this.toDoElem)
      .subscribe(_ => alert("ToDo creato con successo!"), error => console.log(error))
    this.textTodo = ""
  }

  costruisciToDo() {
    this.toDoElem.toDoText = this.textTodo;
    this.toDoElem.currentTime = new Date().toISOString();
    this.toDoElem.fatto = false; // di default è false
  }
}
