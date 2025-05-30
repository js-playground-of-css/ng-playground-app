import { Component, OnInit, signal } from '@angular/core';
import { AdaptativeBatonnetComponent } from '../adaptative-batonnet/adaptative-batonnet.component';
import { EtatPlateau } from '../model/etat-plateau.model';
import { EtatBatonnet } from '../model/etat-batonnet.model';

@Component({
  selector: 'app-board-batonnets',
  imports: [AdaptativeBatonnetComponent],
  templateUrl: 'board-batonnets.component.html',
  styles: `
  #board {
    background-color: #f2f2f2;
    display: inline-block;
    margin-left: 24%;
  }
  `
})
export class BoardBatonnetsComponent implements OnInit {
  protected etatPlateau: EtatPlateau = {
    indexBatonnetCourant: 1, 
    nbBatonnetSelectionne: 1
  };

  maxIndexBatonnetSelectionne = signal(1);

  ngOnInit() {
    this.debutPartie();
  }

  public creerListeBatonnet() {
    return Array.from(
      {length: BoardBatonnetsComponent.nombreTotalBatonnets()}, 
      (_, i) => i + 1
    );
  }

  public static nombreTotalBatonnets() {
    return 20;
  }

  debutPartie() {
    this.etatPlateau = {
      indexBatonnetCourant: 1, 
      nbBatonnetSelectionne: 1
    };
  }

  nbBatonnetSelectionneDebutTour() {
    this.etatPlateau = {
      indexBatonnetCourant: 
        this.etatPlateau === undefined ? 
        1 : 
        this.etatPlateau.indexBatonnetCourant,
      nbBatonnetSelectionne: 1
    };
  }

  handlerEtatBatonnetUpdate(event: Event) {
    this.maxIndexBatonnetSelectionne.update(ancienIndex => {
      const etatBatonnet = (event as CustomEvent).detail as EtatBatonnet;
      if(
        this.etatPlateau && 
        etatBatonnet.etat === AdaptativeBatonnetComponent.SELECTIONNE && 
        ancienIndex < etatBatonnet.index) {
        return etatBatonnet.index;
      }
      return ancienIndex;
    });
  }

}
