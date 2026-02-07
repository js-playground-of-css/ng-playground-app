import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class JoursFeriesFrService {

    private http = inject(HttpClient);

    getData(zone: string, annee: number) : Observable<Map<String,String>> {
        return this.http.get<Map<String,String>>(`https://calendrier.api.gouv.fr/jours-feries/${zone}/${annee}.json`)
    }

    getDataPourMetropole(annee: number) : Observable<Map<String,String>> {
        return this.getData('metropole', annee);
    }

    getDataPourMetropoleEtAnneeCourante() : Observable<Map<String,String>> {
        const annee : number = (new Date()).getFullYear();
        return this.getDataPourMetropole(annee);
    }

}
