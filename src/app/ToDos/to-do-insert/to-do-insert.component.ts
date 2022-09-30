
import { Component, OnInit } from '@angular/core';
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
  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void { }

  takeToDo() {
    if (this.textTodo == '') { // se è vuoto, mi fermo
      alert("Inserire to-do");
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
}
