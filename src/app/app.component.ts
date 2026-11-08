import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h1 style="margin: 0px;" >
      {{title}}
      <button (click)="goToHome()" mat-fab title="Retourner à l'accueil" [disabled]="isHomeRoute()" >
        <mat-icon aria-hidden="false" aria-label="Retourner à l'accueil" fontIcon="home" ></mat-icon>
        <!-- Retourner à l'accueil-->
      </button>
    </h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Terrain de jeu Angular 19';

  readonly #router = inject(Router);

  goToHome() {
    this.#router.navigate(['/home']);
  }

  isHomeRoute() {
    return this.#router.url.startsWith("/home");
  }
}
