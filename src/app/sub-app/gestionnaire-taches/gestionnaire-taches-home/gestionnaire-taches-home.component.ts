import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GestionnaireTachesService } from '../services/gestionnaire-taches.service';
import { Todo } from '../model/todo';

@Component({
  selector: 'gestionnaire-taches-home',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule
  ],
  templateUrl: 'gestionnaire-taches-home.component.html',
  styles: `
    mat-card {
        width: 40%;
        min-width: 600px;
    }
  `
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
     * Modifier une tâche.
     */
    modifierTache(tacheAModifier : Todo) {
        this.#router.navigate(
            ['/sub-app/gestionnaire-taches/modifier-tache'],
            { state: { tache: tacheAModifier } }
        );
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
