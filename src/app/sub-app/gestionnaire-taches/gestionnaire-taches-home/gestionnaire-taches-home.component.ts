import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
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

    readonly #router = inject(Router);

    taches = signal<Array<Todo>>([]);

    ngOnInit() {
        this.chargerTaches();
    }

    /**
     * Ouvrir le formulaire d'ajout d'une tâche.
     */
    goToAddTask() {
        this.#router.navigate(['/sub-app/gestionnaire-taches/ajouter-tache']);
    }

    /**
     * Supprimer une tâche.
     */
    supprimerTache(id : number) {
        this.gestionnaireTachesService.supprimerTache(id).subscribe({
            next: (response) => {
                if(response.code == 200) {
                    this.chargerTaches();
                } else {
                    console.log(`Code inattendu : ${response.code}`);
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    private chargerTaches() {
        this.gestionnaireTachesService.chargerTaches().subscribe({
            next: (data) => {
                this.taches.set(data);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

}
