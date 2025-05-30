import { Component } from '@angular/core';
import { AdaptativeBatonnetComponent } from '../adaptative-batonnet/adaptative-batonnet.component';
import { EtatPlateau } from '../model/etat-plateau.model';
import { EtatBatonnetMapGenerator } from '../utils/etat-batonnet-map-generator';
import { ClaudIa } from '../ia/claud.ia';

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
  #action-bar {
    width: 640px;
    margin-left: 24%;
    text-align: center;
  }
  #play-btn {
    float: clear;
  }
  `
})
export class BoardBatonnetsComponent {
  protected etatPlateau: EtatPlateau = {
    aToiDeJouer: true,
    indexBatonnetCourant: 1, 
    nbBatonnetSelectionne: 0,
    etatBatonnetMap: EtatBatonnetMapGenerator.creerMapBatonnet()
  };

  handlerChangementEtatBatonnet(indiceBatonnet: number) {
    this.reinitialiserPlateau(indiceBatonnet);
  }

  handlerCliqueJouer() {
    this.etatPlateau.indexBatonnetCourant = this.nextIndice();
    this.reinitialiserPlateau(-1);
    this.etatPlateau.aToiDeJouer = false; // au tour de l'IA...
    this.faireJouerIA();
  }

  private faireJouerIA() {
    const iaPlayer = new ClaudIa(this.etatPlateau);
    const nbBatonnetSelectionne = iaPlayer.jouer();
    this.reinitialiserPlateau(this.calculerIndiceBatonnetSelectionne(nbBatonnetSelectionne));
    this.etatPlateau.indexBatonnetCourant = this.nextIndice();
    this.reinitialiserPlateau(-1);
    this.etatPlateau.aToiDeJouer = true; // au tour du joueur...
    this.etatPlateau.nbBatonnetSelectionne = 0;
  }

  private calculerIndiceBatonnetSelectionne(nbBatonnetASelectionner: number): number {
    const indiceBatonnet = (this.etatPlateau.indexBatonnetCourant + nbBatonnetASelectionner);
    console.log(`indiceCourant = ${this.etatPlateau.indexBatonnetCourant} ; nbBatonnet = ${nbBatonnetASelectionner} => indiceOutput = ${indiceBatonnet}`);
    return indiceBatonnet;
  }

  private nextIndice(): number {
    let indiceSuivant = this.etatPlateau.indexBatonnetCourant;
    for(const etatBatonnet of this.etatPlateau.etatBatonnetMap.values()) {
      if(
        indiceSuivant < etatBatonnet.index && 
        (
          etatBatonnet.etat === EtatBatonnetMapGenerator.SELECTIONNE ||
          etatBatonnet.etat === EtatBatonnetMapGenerator.RETIRER_DU_PLATEAU
        )
      ) {
        indiceSuivant = etatBatonnet.index;
      }
    }
    return indiceSuivant;
  }

  private reinitialiserPlateau(indice: number) {
    this.etatPlateau.nbBatonnetSelectionne = 0;
    for(const etatBatonnet of this.etatPlateau.etatBatonnetMap.values()) {
      let nouvelEtat: number = EtatBatonnetMapGenerator.SUR_PLATEAU;
      if(etatBatonnet.index <= this.etatPlateau.indexBatonnetCourant) {
        nouvelEtat = EtatBatonnetMapGenerator.RETIRER_DU_PLATEAU;
      } else if(etatBatonnet.index <= indice) {
        nouvelEtat = EtatBatonnetMapGenerator.SELECTIONNE;
      }
      const nouveauEtatBatonnet = {
        index: etatBatonnet.index,
        etat: nouvelEtat
      };
      if(nouvelEtat === EtatBatonnetMapGenerator.SELECTIONNE) {
        this.etatPlateau.nbBatonnetSelectionne++;
      }
      this.etatPlateau.etatBatonnetMap.set(nouveauEtatBatonnet.index, nouveauEtatBatonnet);
    }
  }

}
