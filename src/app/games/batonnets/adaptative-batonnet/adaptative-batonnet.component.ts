import { Component, signal, computed, input, output } from '@angular/core';
import { EtatPlateau } from '../model/etat-plateau.model';
import { EtatBatonnet } from '../model/etat-batonnet.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-adaptative-batonnet',
  imports: [NgStyle],
  template: `
    <span 
      (click)="onUpdateEtatBatonnet()" 
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

  static SUR_PLATEAU: number = 2;
  static SELECTIONNE: number = 1;
  static RETIRER_DU_PLATEAU: number = 0;

  etatBatonnet = signal(AdaptativeBatonnetComponent.SUR_PLATEAU);

  getCssStyle = computed(() => {
    switch(this.etatBatonnet()) {
      case AdaptativeBatonnetComponent.SUR_PLATEAU:
        return {'background-color': '#ff9933'};
      case AdaptativeBatonnetComponent.RETIRER_DU_PLATEAU:
        return {'background-color': '#663300'};
      default:
        return {'background-color': '#cc6600'};
    }
  });
  
  inputEtatPlateau = input.required<EtatPlateau>();
  inputIndexBatonnet = input.required<number>();
  onEtatBatonnetUpdate = output<EtatBatonnet>();

  constructor() {}

  inverserEtat() {
    this.etatBatonnet.update(ancienEtat =>  {
      return ancienEtat === AdaptativeBatonnetComponent.SELECTIONNE ?
        AdaptativeBatonnetComponent.SUR_PLATEAU :
        AdaptativeBatonnetComponent.SELECTIONNE;
    });
  }

  selectionner() {
    this.etatBatonnet.update(() => AdaptativeBatonnetComponent.SELECTIONNE);
  }

  onUpdateEtatBatonnet() {
    if(this.inputEtatPlateau().nbBatonnetSelectionne < 3) {
      this.inverserEtat();
      this.onEtatBatonnetUpdate.emit({
        index: this.inputIndexBatonnet(),
        etat: this.etatBatonnet()
      });
    }
  }

}
