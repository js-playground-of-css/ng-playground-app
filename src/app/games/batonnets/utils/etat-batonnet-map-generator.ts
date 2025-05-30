import { EtatBatonnet } from "../model/etat-batonnet.model";
import { BatonnetSettings } from "./batonnet-settings";

export class EtatBatonnetMapGenerator {

  public static SUR_PLATEAU: number = 2;
  public static SELECTIONNE: number = 1;
  public static RETIRER_DU_PLATEAU: number = 0;

  public static creerMapBatonnet(): Map<number, EtatBatonnet> {
    let etatBatonnetMap: Map<number, EtatBatonnet> = new Map();
    for(const indexBatonnet of EtatBatonnetMapGenerator.creerListeIndexBatonnet()) {
        const etat : EtatBatonnet = {
            index: indexBatonnet,
            etat: EtatBatonnetMapGenerator.SUR_PLATEAU
        };
        etatBatonnetMap.set(
            indexBatonnet,
            etat
        );
    }
    return etatBatonnetMap;
  }

  private static creerListeIndexBatonnet(): number[] {
    return Array.from(
      {length: BatonnetSettings.nombreTotalBatonnets()}, 
      (_, i) => i + 1
    );
  }

}