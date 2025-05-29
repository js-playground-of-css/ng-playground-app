import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1 class="m-2 text-white" (click)="goToHome()">{{title}}</h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Terrain de jeu Angular 19';

  private router = inject(Router);

  goToHome() {
    this.router.navigate(['/home']);
  }
}
