export interface ToDoElem { // interfaccia per ogni ToDo
    id: number,
    todo_text: string,
    current_time: string,
    fatto?: boolean,
}

export interface ToDoElemIns { // interfaccia per ogni ToDo
    todo_text: string,
    current_time: string,
    fatto?: boolean,
}