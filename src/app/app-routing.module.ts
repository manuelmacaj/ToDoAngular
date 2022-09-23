import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowToDoComponent } from './show-to-do/show-to-do.component';
import { ToDoDetailComponent } from './to-do-detail/to-do-detail.component';
import { ToDoInsertComponent } from './to-do-insert/to-do-insert.component';

const routes: Routes = [
  { path: '', redirectTo: "/insert", pathMatch: "full" },
  { path: "insert", component: ToDoInsertComponent },
  { path: "todos", component: ShowToDoComponent },
  { path: "detail/:idTodo", component: ToDoDetailComponent },
  { path: "login", component: LoginComponent },
  { path: "**", pathMatch: "full", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
