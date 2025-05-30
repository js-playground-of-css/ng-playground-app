import { EtatBatonnet } from "./etat-batonnet.model";

export interface EtatPlateauSimplifie {
    indexBatonnetCourant: number;
    etatBatonnetMap: Map<number, EtatBatonnet>;
}