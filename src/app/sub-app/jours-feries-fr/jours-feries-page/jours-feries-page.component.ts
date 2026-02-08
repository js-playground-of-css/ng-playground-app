import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { JoursFeriesFrService } from '../services/jours-feries-fr.service';
import { DateUtils } from '../../../utils/date-utils';
import { JoursFeries } from '../model/jours-feries';

@Component({
  selector: 'jours-feries-page',
  imports: [],
  template: `
    <p class="text-white" >
      Jours fériés français WIP ;)
    </p>
  `,
  styles: ``
})
export class JoursFeriesPageComponent implements OnInit {

    private joursFeriesFrService = inject(JoursFeriesFrService);

    ngOnInit() {
        const anneeActuelle : number = (new Date()).getFullYear();
        const data = localStorage.getItem(`${anneeActuelle}`);
        if(data == null) {
            this.joursFeriesFrService.getDataPourMetropole(anneeActuelle).subscribe({
                next: (data) => {
                    localStorage.setItem(`${anneeActuelle}`, JSON.stringify(data));
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
        this.recupererProchainJoursFerie();
    }

    recupererProchainJoursFerie() {
        const anneeActuelle : number = (new Date()).getFullYear();
        const data = localStorage.getItem(`${anneeActuelle}`);
        if(data !== null) {
            const now : Date = new Date();
            let prochainJoursFeries : JoursFeries | null = null;
            // Parsing des données JSON
            const dataObj = Object.entries(JSON.parse(data));
            // Récupération du prochain jours fériés
            for(let index = 0 ; index < dataObj.length && prochainJoursFeries == null ; index++) {
                const cle : string = dataObj[index][0];
                const cleToDate : Date = DateUtils.stringToDate(cle);
                if(now.getTime() < cleToDate.getTime()) {
                    prochainJoursFeries = new JoursFeries(cle, dataObj[index][1] as string);
                }
            }
            console.log(prochainJoursFeries);
        }
    }

}
