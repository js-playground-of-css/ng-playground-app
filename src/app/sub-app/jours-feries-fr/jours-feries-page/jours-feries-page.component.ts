import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
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
  templateUrl: 'jours-feries-fr.component.html',
  styles: ``
})
export class JoursFeriesPageComponent implements OnInit, OnDestroy {
    NO_EVENT : number = -1;
    prochainJoursFeries = signal<JoursFeries|null>(null);
    joursFeriesSuivant = signal<Array<JoursFeries>|null>(null);
    timeoutId : number = this.NO_EVENT;
    nbRetry : number = 0;

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

    aJoursFeriesSuivant = computed(() => { return ( this.joursFeriesSuivant() !== null ); } );

    private joursFeriesFrService = inject(JoursFeriesFrService);

    ngOnInit() {
        const anneeActuelle : number = (new Date()).getFullYear();
        const data = localStorage.getItem(`${anneeActuelle}`);
        if(data == null) {
            this.chargerJoursFeries();
        }
        this.recupererProchainJoursFerie();
    }

    ngOnDestroy() {
        if(this.timeoutId !== this.NO_EVENT) {
            clearTimeout(this.timeoutId);
        }
    }

    recupererProchainJoursFerie() {
        const anneeActuelle : number = (new Date()).getFullYear();
        const data = localStorage.getItem(`${anneeActuelle}`);
        if(data !== null) {
            const nowDate : Date = Today.date();
            // Parsing des données JSON
            const dataObj = Object.entries(JSON.parse(data));
            // Récupération du prochain jours fériés
            let lastDate = nowDate.getTime();
            let indexJoursFeries = 0;
            for(let index = 0 ; index < dataObj.length ; index++) {
                const cle : string = dataObj[index][0];
                const cleToDate : Date = DateUtils.stringToDate(cle);
                if(lastDate <= cleToDate.getTime()) {
                    switch(indexJoursFeries) {
                        case 0:
                            this.prochainJoursFeries.set(new JoursFeries(cle, dataObj[index][1] as string));
                            break;
                        default:
                            let joursFeriesApresList = this.joursFeriesSuivant();
                            if(joursFeriesApresList == null) {
                                joursFeriesApresList = new Array();
                            }
                            joursFeriesApresList.push(new JoursFeries(cle, dataObj[index][1] as string));
                            this.joursFeriesSuivant.set(joursFeriesApresList);
                    }
                    lastDate = cleToDate.getTime();
                    indexJoursFeries++;
                }
            }
            // On repase le retry à zéro
            this.nbRetry = 0;
            // rappeler dans quelques temps
            if(this.timeoutId !== this.NO_EVENT) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setInterval(() => {
                this.recupererProchainJoursFerie();
            }, this.calculerDelaiAvantProchainRafraichissement());
        } else {
            // On charge les données de l'année car il y a problamment eu un changement d'année
            this.chargerJoursFeries();
            // On retente de les affichés si c'est la première tentative
            if(this.nbRetry == 0) {
                this.recupererProchainJoursFerie();
            }
            this.nbRetry++;
        }
    }

    chargerJoursFeries() {
        const anneeActuelle : number = (new Date()).getFullYear();
        this.joursFeriesFrService.getDataPourMetropole(anneeActuelle).subscribe({
            next: (data) => {
                localStorage.setItem(`${anneeActuelle}`, JSON.stringify(data));
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    calculerDelaiAvantProchainRafraichissement() : number {
        const aujourdhui = new Date();
        const deltaHeure = 23 - aujourdhui.getHours();
        const deltaMinutes = 59 - aujourdhui.getMinutes();
        const deltaSecondes = 59 - aujourdhui.getSeconds();
        const deltaMillisecondes = 999 - aujourdhui.getMilliseconds();
        return (
            ( deltaHeure * (60*60*1000) ) +
            ( deltaMinutes * (60*1000) ) +
            ( deltaSecondes * 1000 ) +
            deltaMillisecondes + 15
        );
    }

}
