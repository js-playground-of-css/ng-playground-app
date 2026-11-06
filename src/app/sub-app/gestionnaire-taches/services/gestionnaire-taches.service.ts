import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';
import { ResponseTodoList } from '../model/response-todo-list';

@Injectable({providedIn: 'root'})
export class GestionnaireTachesService {

    private http = inject(HttpClient);

    private urlService = 'http://localhost:18061/api/v1/todo/';

    chargerTaches() : Observable<Array<Todo>> {
        return this.http.get<Array<Todo>>(`${this.urlService}todolist`);
    }

    supprimerTache(id : number) : Observable<ResponseTodoList> {
        return this.http.delete<ResponseTodoList>(`${this.urlService}deleteitem/${id}`);
    }

}