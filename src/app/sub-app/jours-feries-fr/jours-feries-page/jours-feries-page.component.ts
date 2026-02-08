import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { JoursFeriesFrService } from '../services/jours-feries-fr.service';
import { DateUtils } from '../../../utils/date-utils';
import { JoursFeries } from '../model/jours-feries';
import { Today } from '../../../utils/today';
import { DateDuration } from '../../../utils/model/date-duration';
import { DateConstants } from '../../../constants/date-constants';

@Component({
  selector: 'jours-feries-page',
  imports: [],
  template: `
    <p class="text-white m-2" >
      Prochain jours fériés : {{libelleProchainJoursFeries()}} {{dureeProchainJoursFeries()}}
    </p>
  `,
  styles: ``
})
export class JoursFeriesPageComponent implements OnInit {
    prochainJoursFeries = signal<JoursFeries|null>(null);

    libelleProchainJoursFeries = computed(() => {
        let libelle = 'ND';
        if(this.prochainJoursFeries() !== null) {
            libelle = (this.prochainJoursFeries() as JoursFeries).getLibelle();
        }
        return libelle;
    });

    dureeProchainJoursFeries = computed(() => {
        let libelleDuree = '';
        if(this.prochainJoursFeries() !== null) {
            const durationObj : DateDuration = DateUtils.computeDurationWithToday(
                DateUtils.stringToDate(
                    (this.prochainJoursFeries() as JoursFeries).getJoursStr()
                )
            );
            if(durationObj.getUnit() === DateConstants.UNIT_DURATION_ATM) {
                libelleDuree = "(aujourd'hui)";
            } else if(durationObj.getUnit() === DateConstants.UNIT_DURATION_DAY) {
                if(durationObj.getLabel() === '2') {
                    libelleDuree = '(après-demain)';
                } else if(durationObj.getLabel() === '1') {
                    libelleDuree = '(demain)';
                } else {
                    libelleDuree = `dans ${durationObj.getLabel()} jours`;
                }
            } else if(durationObj.getUnit() === DateConstants.UNIT_DURATION_HOUR) {
                libelleDuree = `dans ${durationObj.getLabel()} heures`;
            } else {
                libelleDuree = `dans ${durationObj.getLabel()} minutes`;
            }
        }
        return libelleDuree;
    });

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
            const nowDate : Date = Today.date();
            // Parsing des données JSON
            const dataObj = Object.entries(JSON.parse(data));
            // Récupération du prochain jours fériés
            for(let index = 0 ; index < dataObj.length && this.prochainJoursFeries() == null ; index++) {
                const cle : string = dataObj[index][0];
                const cleToDate : Date = DateUtils.stringToDate(cle);
                if(nowDate.getTime() <= cleToDate.getTime()) {
                    this.prochainJoursFeries.set(new JoursFeries(cle, dataObj[index][1] as string));
                }
            }
        }
    }

}
