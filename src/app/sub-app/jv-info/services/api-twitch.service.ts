import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResults } from './../model/auth-results'

@Injectable({providedIn: 'root'})
export class ApiTwitchService {

    private http = inject(HttpClient);

    getAuthenticate(clientID : string, secret : string) : Observable<AuthResults> {
        return this.http.post<AuthResults>(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${secret}&grant_type=client_credentials`, null);
    }

    rechercherJV(tokenApi : string, keywords : string) {
        const headers = new HttpHeaders({
            //'Client-ID': 'client-id-a-fournir',
            'Authorization': `Bearer ${tokenApi}`
        });

        return this.http.post('https://api.igdb.com/v4/games', 'search "Neva"; fields id, name;', { headers });
    }

}