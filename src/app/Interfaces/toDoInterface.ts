export interface ToDoElem { // interfaccia per ogni ToDo
    idTodo: number,
    toDoText: string,
    currentTime: string,
    fatto?: boolean,
}