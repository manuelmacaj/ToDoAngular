import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ToDoElem } from 'src/app/Interfaces/toDoInterface';
import { ToDoService } from 'src/app/to-do.service';

@Component({
  selector: 'app-shows-to-do',
  templateUrl: './shows-to-do.component.html',
  styleUrls: ['./shows-to-do.component.css']
})
export class ShowsToDoComponent implements OnInit {
  toDoList: ToDoElem[] = [];
  nameUser = (localStorage.getItem("name"))

  constructor(private toDoService: ToDoService, protected auth: AuthService) { }

  ngOnInit(): void {
    this.getAllToDoList();
  }
  
  // https://www.djamware.com/post/5d8d7fc10daa6c77eed3b2f2/angular-8-tutorial-rest-api-and-httpclient-examples
  // https://mercyjemosop.medium.com/rest-api-with-angular-e7c2ceaaace1

  getAllToDoList() { // funzione per il prelevamento di tutti gli elementi dal database
    this.toDoService.getAllToDoList().subscribe(data => {
      this.toDoList = data
      this.toDoList.reverse();
    }, (_ => {
      this.logout();
    })
    )
  }
  logout() {
    this.auth.logout()
  }
}
