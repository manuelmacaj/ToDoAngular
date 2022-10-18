# ToDo List (Angular)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2. 
I used [Angular Material](https://material.angular.io/).

## What is To-Do List (Angular)?

To-Do List is my first Web Application developed with Angular Framework.
To create a list of ToDo, you need to create an account.
After created an account, you will able to:

## Insert a To-Do
![Poster 1](media/REDME%20FILE/InsertToDoScreen.png)
This section allows you to create a To-Do. The send button works if you logged in your account. 

## See all To-Do
![Poster 1](media/REDME%20FILE/allToDoScreen.png)
This section allows you to see the own To-Do List. Each To-Do element has a background color: 
- `Green` means that this task is completed; 
- `Red` means that this task isn't completed yet.

Other thing is the Tab on top the To-Do List:
- `All ToDo tab` is the section where you can see all the To-Do list;
- `ToDo tab` is the section where you can see  all the uncompleted ToDo;
- `Completati tab` is the section where you can see all the completed To-Do;

## Edit a To-Do
![Poster 1](media/REDME%20FILE/DetailToDo.png)
This section allows you to edit a To-Do selected from the list:
- `Update` button: update status and/or text;
- `Delete` button: delete the To-Do from DB; 
- `Go Back` button: return to To-Do List.

## How sign-in/sign up?
On the toolbar, there's the menu icon. after clicking, it appears a SideNav. 
![Poster 1](media/REDME%20FILE/Login.png)

### Login page
![Poster 1](media/REDME%20FILE/LoginToDoScreen.png)

### Sign-up
![Poster 1](media/REDME%20FILE/SignUPScreen.png)


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
