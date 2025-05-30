import { Component, computed, input, output } from '@angular/core';
import { EtatPlateau } from '../model/etat-plateau.model';
import { EtatBatonnet } from '../model/etat-batonnet.model';
import { NgStyle } from '@angular/common';
import { EtatBatonnetMapGenerator } from '../utils/etat-batonnet-map-generator';

@Component({
  selector: 'app-adaptative-batonnet',
  imports: [NgStyle],
  template: `
    <span 
      (click)="onChangementEtatBatonnet()"
      [ngStyle]="this.getCssStyle()" 
      ></span>
  `,
  styles: `
  span {
    display: inline-block;
    margin: 8px;
    width: 16px;
    height: 160px;
  }
  `
})
export class AdaptativeBatonnetComponent {

  getCssStyle = computed(() => {
    switch(this.inputEtatBatonnet().etat) {
      case EtatBatonnetMapGenerator.SUR_PLATEAU:
        return {'background-color': '#ff9933'};
      case EtatBatonnetMapGenerator.RETIRER_DU_PLATEAU:
        return {'background-color': '#663300'};
      default:
        return {'background-color': '#cc6600'};
    }
  });
  
  inputEtatPlateau = input.required<EtatPlateau>();
  inputEtatBatonnet = input.required<EtatBatonnet>();
  outputIndiceBatonnet = output<number>();

  constructor() {}

  inverserEtat() {
    if(this.inputEtatBatonnet().etat === EtatBatonnetMapGenerator.SELECTIONNE) {
        this.inputEtatPlateau().nbBatonnetSelectionne++;
    } else {
      this.inputEtatPlateau().nbBatonnetSelectionne--;
    }
  }

  onChangementEtatBatonnet() {
    if(
      (
        this.inputEtatPlateau().nbBatonnetSelectionne <= 3 &&
        (this.inputEtatBatonnet().index - this.inputEtatPlateau().indexBatonnetCourant + 1) <= 3
      ) ||
      this.inputEtatBatonnet().etat === EtatBatonnetMapGenerator.SELECTIONNE
    ) {
      this.inverserEtat();
      this.outputIndiceBatonnet.emit(this.inputEtatBatonnet().index);
    }
  }

}
