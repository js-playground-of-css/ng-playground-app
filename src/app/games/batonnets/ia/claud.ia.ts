import { NumberUtils } from "../../../utils/number-utils";
import { EtatPlateauSimplifie } from "../model/etat-plateau-simplifie.model";
import { EtatBatonnetMapGenerator } from "../utils/etat-batonnet-map-generator";

export class ClaudIa {

    constructor(private etatPlateau: EtatPlateauSimplifie) {}

    public jouer(): number {
        let nombreBatonnetSelectionne = 0;
        const nbBatonnetSelectionnable = this.compterNombreBatonnetSelectionnable();
        if(nbBatonnetSelectionnable <= 4) {
            // Phase finale
            const jourDeChance : boolean = (
                NumberUtils.tirerAleatoirementNombreEntier(0, 1000000) % 2 == 0
            );
            if(jourDeChance) {
                // Si c'est le jour de chance du joueur alors on lui laisse une chance de gagner !
                const maxBatonnetSelectionnable = (nbBatonnetSelectionnable - 2);
                if(maxBatonnetSelectionnable > 1) {
                    nombreBatonnetSelectionne = NumberUtils.tirerAleatoirementNombreEntier(1, maxBatonnetSelectionnable);
                } else {
                    nombreBatonnetSelectionne = 1;
                }
            }
            else {
                // Si ce n'est pas le jour de chance du joueur alors on le fait perdre !
                nombreBatonnetSelectionne = (nbBatonnetSelectionnable - 1);
            }
        }
        else {
            // Dans les autres cas, on tire un nombre aléatoire !
            nombreBatonnetSelectionne = NumberUtils.tirerAleatoirementNombreEntier(1, 3);
        }
        return nombreBatonnetSelectionne;
    }

    private compterNombreBatonnetSelectionnable(): number {
        let nbBatonnetSelectionnable: number = 0;
        this.etatPlateau.etatBatonnetMap.forEach((etatBatonnet) => {
            if(etatBatonnet.etat === EtatBatonnetMapGenerator.SUR_PLATEAU) {
                nbBatonnetSelectionnable++;
            }
        });
        return nbBatonnetSelectionnable;
    }

}