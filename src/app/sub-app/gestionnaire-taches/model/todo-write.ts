import { Todo } from "./todo";

export type TodoWrite = Omit<Todo, 'creationDate' | 'updateDate'>;
