import { Component, inject, OnInit, signal } from '@angular/core';
import { GestionnaireTachesService } from '../services/gestionnaire-taches.service';
import { Todo } from '../model/todo';

@Component({
  selector: 'gestionnaire-taches-home',
  imports: [],
  templateUrl: 'gestionnaire-taches-home.component.html',
  styles: ``
})
export class GestionnaireTachesHomeComponent implements OnInit {
    
    private gestionnaireTachesService = inject(GestionnaireTachesService);

    taches = signal<Array<Todo>>([]);

    ngOnInit() {
        this.chargerTaches();
    }

    private chargerTaches() {
        this.gestionnaireTachesService.getTaches().subscribe({
            next: (data) => {
                this.taches.set(data);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

}
