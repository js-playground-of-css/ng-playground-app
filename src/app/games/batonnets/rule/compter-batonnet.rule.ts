import { EtatBatonnet } from "../model/etat-batonnet.model";
import { EtatBatonnetMapGenerator } from "../utils/etat-batonnet-map-generator";

export class CompterBatonnetRule {

    public static compterBatonnetSelectionnable(etatBatonnetMap: Map<number, EtatBatonnet>): number {
        let nbBatonnetSelectionnable: number = 0;
        etatBatonnetMap.forEach((etatBatonnet) => {
            if(etatBatonnet.etat === EtatBatonnetMapGenerator.SUR_PLATEAU) {
                nbBatonnetSelectionnable++;
            }
        });
        return nbBatonnetSelectionnable;
    }
}