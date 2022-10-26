# ToDo List (Angular)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2. 

I used [Angular Material](https://material.angular.io/).

To test my site: https://manuelmacaj.github.io/ToDoAngular/

## What is To-Do List (Angular)?

To-Do List is my first Web Application developed with Angular Framework.
To create a list of ToDo, you need to create an account.
After created an account, you will able to:

## Insert a To-Do
![Insert To-Do](./media/README%20IMAGE/InsertToDoScreen.png)
This section allows you to create a To-Do. The send button works if you logged in your account. 

## See all To-Do
![All To-Do](./media/README%20IMAGE/allToDoScreen.png)
This section allows you to see the own To-Do List. Each To-Do element has a background color: 
- `Green` means that this task is completed; 
- `Red` means that this task isn't completed yet.

Other thing is the Tab on top the To-Do List:
- `All ToDo tab` is the section where you can see all the To-Do list;
- `ToDo tab` is the section where you can see  all the uncompleted ToDo;
- `Completati tab` is the section where you can see all the completed To-Do;

## Edit a To-Do
![Detail To-Do](./media/README%20IMAGE/DetailToDo.png)
This section allows you to edit a To-Do selected from the list:
- `Update` button: update status and/or text;
- `Delete` button: delete the To-Do from DB; 
- `Go Back` button: return to To-Do List.

## How sign-in/sign up?
On the toolbar, there's the menu icon. after clicking, it appears a SideNav. 
![Menu](./media/README%20IMAGE/LoginMenu.png)

### Login page
![Login](./media/README%20IMAGE/Login.png)

### Sign-up
![Sign-up](./media/README%20IMAGE/SignUPScreen.png)

## Small consideration about this web app
- I realized the BackEnd application in Python with Flask and deployed on render.com (so you will interact with it). 
All data are stored in a remote DataBase (a PostGres DBMS). 
[GitHub repository](https://github.com/manuelmacaj/BackEndToDo). 
- After login, the server will provide you with a token (JWT Token) that will allow you to perform functions of creation, display your To Do List and modification of a specific To Do. The token doesn't last forever, at some point it expires (you need to re-authenticate, if you want to continue).
- The maximum limit of a To Do text is 80 characters. 
- The password associated with the account is not saved in plain text: in fact I foreseed a hashing password application before saving. 
- Being a web application it works everywhere: just need a browser.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
