import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({providedIn: 'root'})
export class GestionnaireTachesService {

    private http = inject(HttpClient);

    getTaches() : Observable<Array<Todo>> {
        return this.http.get<Array<Todo>>('http://localhost:8080/api/v1/todo/todolist');
    }

}