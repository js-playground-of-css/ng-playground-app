import { Component } from '@angular/core';
import { AdaptativeBatonnetComponent } from '../adaptative-batonnet/adaptative-batonnet.component';
import { EtatPlateau } from '../model/etat-plateau.model';
import { EtatBatonnetMapGenerator } from '../utils/etat-batonnet-map-generator';

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
export class BoardBatonnetsComponent {
  protected etatPlateau: EtatPlateau = {
    indexBatonnetCourant: 1, 
    nbBatonnetSelectionne: 1,
    etatBatonnetMap: EtatBatonnetMapGenerator.creerMapBatonnet()
  };

  handlerChangementEtatBatonnet(indiceBatonnet: number) {
    this.reinitialiserPlateau(indiceBatonnet);
  }

  private reinitialiserPlateau(indice: number) {
    for(const etatBatonnet of this.etatPlateau.etatBatonnetMap.values()) {
      let nouvelEtat: number = EtatBatonnetMapGenerator.SUR_PLATEAU;
      if(etatBatonnet.index <= indice) {
        nouvelEtat = EtatBatonnetMapGenerator.SELECTIONNE;
      } else if(etatBatonnet.index < this.etatPlateau.indexBatonnetCourant) {
        nouvelEtat = EtatBatonnetMapGenerator.RETIRER_DU_PLATEAU;
      }
      const nouveauEtatBatonnet = {
        index: etatBatonnet.index,
        etat: nouvelEtat
      };
      this.etatPlateau.etatBatonnetMap.set(nouveauEtatBatonnet.index, nouveauEtatBatonnet);
    }
  }

}
