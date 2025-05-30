import { EtatBatonnet } from "./etat-batonnet.model";

export interface EtatPlateau {
    indexBatonnetCourant: number;
    nbBatonnetSelectionne: number;
    etatBatonnetMap: Map<number, EtatBatonnet>;
}