import { EtatBatonnet } from "./etat-batonnet.model";

export interface EtatPlateau {
    aToiDeJouer: boolean;
    indexBatonnetCourant: number;
    nbBatonnetSelectionne: number;
    etatBatonnetMap: Map<number, EtatBatonnet>;
}