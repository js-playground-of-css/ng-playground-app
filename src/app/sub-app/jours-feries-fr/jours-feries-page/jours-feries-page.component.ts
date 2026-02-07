import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { JoursFeriesFrService } from '../services/jours-feries-fr.service';

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
        this.joursFeriesFrService.getDataPourMetropoleEtAnneeCourante().subscribe({
            next: (data) => {
                console.log(data);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

}
