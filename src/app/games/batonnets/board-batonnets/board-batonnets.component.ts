import { Component, signal, computed } from '@angular/core';
import { AdaptativeBatonnetComponent } from '../adaptative-batonnet/adaptative-batonnet.component';
import { EtatPlateau } from '../model/etat-plateau.model';
import { EtatBatonnetMapGenerator } from '../utils/etat-batonnet-map-generator';
import { ClaudIa } from '../ia/claud.ia';
import { EtatBatonnet } from '../model/etat-batonnet.model';
import { CompterBatonnetRule } from '../rule/compter-batonnet.rule';
import { PartieEtat } from '../etat/partie.etat';

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
  .statut-partie {
    width: 640px;
    margin-left: 24%;
    text-align: center;
    font-size: 40px;
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

  etatPartie = signal<number>(PartieEtat.EN_COURS);
  partieEstFinie = computed(() => (this.etatPartie() !== PartieEtat.EN_COURS));
  partieEstGagnee = computed(() => (this.etatPartie() !== PartieEtat.GAGNEE));
  partieEstPerdue = computed(() => (this.etatPartie() !== PartieEtat.PERDUE));

  handlerChangementEtatBatonnet(indiceBatonnet: number) {
    this.reinitialiserPlateau(indiceBatonnet);
  }

  handlerCliqueJouer() {
    this.etatPlateau.indexBatonnetCourant = this.nextIndice();
    this.reinitialiserPlateau(-1);
    this.etatPlateau.aToiDeJouer = false; // au tour de l'IA...
    this.finDePartie();
    if(this.etatPartie() === PartieEtat.EN_COURS) {
      this.faireJouerIA();
    }
  }

  handleRejouer() {
    this.reinitialiserPartie();
  }

  private faireJouerIA() {
    const iaPlayer = new ClaudIa(this.etatPlateau);
    const nbBatonnetSelectionne = iaPlayer.jouer();
    this.reinitialiserPlateau(this.calculerIndiceBatonnetSelectionne(nbBatonnetSelectionne));
    this.etatPlateau.indexBatonnetCourant = this.nextIndice();
    this.reinitialiserPlateau(-1);
    this.etatPlateau.aToiDeJouer = true; // au tour du joueur...
    this.etatPlateau.nbBatonnetSelectionne = 0;
    this.finDePartie();
  }

  private calculerIndiceBatonnetSelectionne(nbBatonnetASelectionner: number): number {
    const indiceBatonnet = (this.etatPlateau.indexBatonnetCourant + nbBatonnetASelectionner);
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
        indiceSuivant = etatBatonnet.index + 1;
      }
    }
    return indiceSuivant;
  }

  private reinitialiserPlateau(indice: number) {
    this.etatPlateau.nbBatonnetSelectionne = 0;
    for(const etatBatonnet of this.etatPlateau.etatBatonnetMap.values()) {
      let nouveauEtatBatonnet = etatBatonnet;
      if(this.isChangerEtatBatonnet(indice)) {
        nouveauEtatBatonnet = this.changerEtatBatonnet(etatBatonnet, indice);
      }
      const nouvelEtat = nouveauEtatBatonnet.etat;
      if(nouvelEtat === EtatBatonnetMapGenerator.SELECTIONNE) {
        this.etatPlateau.nbBatonnetSelectionne++;
      }
      this.etatPlateau.etatBatonnetMap.set(nouveauEtatBatonnet.index, nouveauEtatBatonnet);
    }
  }

  private isChangerEtatBatonnet(indice: number) : boolean {
    const batonnet = this.etatPlateau.etatBatonnetMap.get(indice);
    return (
      (
        batonnet != undefined &&
        (
          batonnet.etat === EtatBatonnetMapGenerator.SELECTIONNE ||
          batonnet.etat === EtatBatonnetMapGenerator.SUR_PLATEAU
        )
      ) ||
      indice === -1
    );
  }

  private changerEtatBatonnet(
    etatBatonnet: EtatBatonnet, 
    indice: number
  ): EtatBatonnet {
    let nouvelEtat: number = EtatBatonnetMapGenerator.SUR_PLATEAU;
    if(
      etatBatonnet.index >= this.etatPlateau.indexBatonnetCourant &&
      etatBatonnet.index <= indice && 
      (
        etatBatonnet.etat === EtatBatonnetMapGenerator.SUR_PLATEAU ||
        etatBatonnet.etat === EtatBatonnetMapGenerator.SELECTIONNE
      )
    ) {
      nouvelEtat = EtatBatonnetMapGenerator.SELECTIONNE;
    } else if(
      etatBatonnet.index < this.etatPlateau.indexBatonnetCourant &&
      (
        etatBatonnet.etat === EtatBatonnetMapGenerator.SELECTIONNE ||
        etatBatonnet.etat === EtatBatonnetMapGenerator.RETIRER_DU_PLATEAU
      )
    ) {
      nouvelEtat = EtatBatonnetMapGenerator.RETIRER_DU_PLATEAU;
    }
    return {
      index: etatBatonnet.index,
      etat: nouvelEtat
    };
  }

  private finDePartie() {
    const nbBatonnetSelectionnable = 
      CompterBatonnetRule
        .compterBatonnetSelectionnable(this.etatPlateau.etatBatonnetMap);
    if(nbBatonnetSelectionnable <= 1) {
      if(this.etatPlateau.aToiDeJouer) {
        this.etatPartie.set(PartieEtat.PERDUE);
      } else {
        this.etatPartie.set(PartieEtat.GAGNEE);
      }
    }
  }

  private reinitialiserPartie() {
    // Réinitialiser plateau
    for(const etatBatonnet of this.etatPlateau.etatBatonnetMap.values()) {
      const nouveauEtatBatonnet = {
        etat: EtatBatonnetMapGenerator.SUR_PLATEAU,
        index: etatBatonnet.index
      };
      this.etatPlateau.etatBatonnetMap.set(nouveauEtatBatonnet.index, nouveauEtatBatonnet);
    }
    // Réinitialiser autre méta données
    this.etatPlateau.aToiDeJouer = true;
    this.etatPlateau.indexBatonnetCourant = 1;
    this.etatPlateau.nbBatonnetSelectionne = 0;
    // Réinitialiser l'état de la partie
    this.etatPartie.set(PartieEtat.EN_COURS);
  }

}
