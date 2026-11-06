
export interface Todo {
    todoId: number;
    todoTitle: string;
    todoDescription: string;
    isComplete: boolean;
    todoDate: string; // ou Date selon la façon dont vous le gérez
    creationDate: string;
    updateDate: string;
}