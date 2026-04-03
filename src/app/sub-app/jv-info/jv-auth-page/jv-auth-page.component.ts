import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiTwitchService } from './../services/api-twitch.service';
import { AuthCredentials } from './../model/auth-credentials';

@Component({
  selector: 'jv-auth-page',
  imports: [FormsModule],
  templateUrl: 'jv-auth-page.component.html',
  styles: ``
})
export class JvAuthPageComponent implements OnInit {

    authCredentials = new AuthCredentials('', '');

    private apiTwitchService = inject(ApiTwitchService);

    readonly #router = inject(Router);

    seConnecter() {
        this.apiTwitchService.getAuthenticate(
            this.authCredentials.clientID,
            this.authCredentials.secret
        ).subscribe({
            next: (data) => {
                sessionStorage.setItem('tokenTwitch', data.access_token);
                this.goToSearchPage();
            },
            error: (err) => {
                console.log(`L'application a rencontré une erreur lors de l'authentification à l'API Twitch !`);
            }
        });
    }

    ngOnInit() {
        if(sessionStorage.getItem('tokenTwitch') != null) {
            // s'il y a un token alors on redirige sur la page de recherche
            this.goToSearchPage();
        }
    }

    goToSearchPage() {
        this.#router.navigate(['/sub-app/jv-info/search']);
    }

}
