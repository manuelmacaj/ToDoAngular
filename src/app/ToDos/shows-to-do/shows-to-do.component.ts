import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, single, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ToDoElem } from 'src/app/Interfaces/toDoInterface';
import { ToDoService } from 'src/app/to-do.service';

@Component({
  selector: 'app-shows-to-do',
  templateUrl: './shows-to-do.component.html',
  styleUrls: ['./shows-to-do.component.css']
})
export class ShowsToDoComponent implements OnInit, OnDestroy {
  toDoList: ToDoElem[] = [];
  // list$!: Observable<ToDoElem[]>;

  nameUser = (localStorage.getItem("name"));
  navbarfixed: Boolean = false;
  toDoSub: Subscription | undefined

  constructor(private toDoService: ToDoService, protected auth: AuthService) {
  }

  ngOnInit(): void {
    this.getAllToDoList();
  }

  ngOnDestroy(): void {
    this.toDoSub?.unsubscribe
  }

  // https://www.djamware.com/post/5d8d7fc10daa6c77eed3b2f2/angular-8-tutorial-rest-api-and-httpclient-examples
  // https://mercyjemosop.medium.com/rest-api-with-angular-e7c2ceaaace1

  getAllToDoList() { // funzione per il prelevamento di tutti gli elementi dal database
    // this.list$ = this.toDoService.getAllToDoList();
    this.toDoSub = this.toDoService.getAllToDoList().subscribe({
      next: (res: ToDoElem[]) => this.showToDos(res),
      error: _ => this.auth.logout("Tentativo di lettura dei To-Do fallita, rieffettuare il login")
    });
  }

  protected showToDos(data: ToDoElem[]) {
    this.toDoList = data;
    this.toDoList.reverse();
  }

  protected notCompletedToDo(): ToDoElem[] {
    var taskNotCompleted: ToDoElem[] = [];
    this.toDoList.forEach((element) => {
      if (element.fatto == false)
        taskNotCompleted.push(element);
    })
    return taskNotCompleted;
  }

  // protected notCompletedToDo(): ToDoElem[] {
  //   var taskNotCompleted: ToDoElem[] = [];
  //   this.list$.forEach((elem) => {
  //     elem.map((single) => taskNotCompleted.push(single));
  //   })
  //   return taskNotCompleted;
  // }

  protected completedToDo() {
    var taskNotCompleted: ToDoElem[] = []
    this.toDoList.forEach((element) => {
      if (element.fatto == true)
        taskNotCompleted.push(element);
    })
    return taskNotCompleted;
  }

  logout() {
    this.auth.logout("Logout completato.");
  }
}
