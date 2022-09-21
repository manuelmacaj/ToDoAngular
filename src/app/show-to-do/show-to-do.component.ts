import { Component, OnInit } from '@angular/core';
import { ToDoElem } from '../Interfaces/toDoInterface';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-show-to-do',
  templateUrl: './show-to-do.component.html',
  styleUrls: ['./show-to-do.component.css']
})
export class ShowToDoComponent implements OnInit {
  toDoList: ToDoElem[] = [];

  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void {
    this.getAllToDoList();
  }
  
  // https://www.djamware.com/post/5d8d7fc10daa6c77eed3b2f2/angular-8-tutorial-rest-api-and-httpclient-examples
  // https://mercyjemosop.medium.com/rest-api-with-angular-e7c2ceaaace1

  getAllToDoList() { // funzione per il prelevamento di tutti gli elementi dal database
    this.toDoService.getAllToDoList().subscribe(data => {
      console.log(data);
      this.toDoList = data["ToDoALL"];
      this.toDoList.reverse();
    })
  }
}
