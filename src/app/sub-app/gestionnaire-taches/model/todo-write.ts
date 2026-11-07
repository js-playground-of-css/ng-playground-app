import { Todo } from "./todo";

export type TodoWrite = Omit<Todo, 'todoId' | 'creationDate' | 'updateDate'>;
