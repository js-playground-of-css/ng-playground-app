import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiTwitchService } from './../services/api-twitch.service';
import { SearchRequest } from './../model/search-request';

@Component({
  selector: 'jv-search-page',
  imports: [FormsModule],
  templateUrl: 'jv-search-page.component.html',
  styles: ``
})
export class JvSearchPageComponent {

    searchRequest = new SearchRequest('');

    private apiTwitchService = inject(ApiTwitchService);

    rechercher() {
        if(this.searchRequest.keywords != null) {
            this.apiTwitchService.rechercherJV(sessionStorage.getItem('tokenTwitch') as string, this.searchRequest.keywords).subscribe({
                next: (data) => {
                    console.log(data);
                },
                error: (err) => {
                    console.log(`Une erreur s'est produite !`)
                }
            });
        }
    }

}
