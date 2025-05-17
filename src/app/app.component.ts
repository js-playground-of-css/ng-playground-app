import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1 class="m-2 text-white" >{{title}}</h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Terrain de jeu Angular 19';
}
