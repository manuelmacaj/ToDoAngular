import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './Auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowsToDoComponent } from './ToDos/shows-to-do/shows-to-do.component';
import { ToDoDetailComponent } from './ToDos/to-do-detail/to-do-detail.component';
import { ToDoInsertComponent } from './ToDos/to-do-insert/to-do-insert.component'; 

const routes: Routes = [
  { path: '', redirectTo: "/insert", pathMatch: "full" },
  { path: "insert", component: ToDoInsertComponent },
  { path: "todos", component: ShowsToDoComponent, canActivate: [AuthGuard] },
  { path: "detail/:id", component: ToDoDetailComponent},
  { path: "login", component: LoginComponent },
  { path: "**", pathMatch: "full", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
