import { Component } from '@angular/core';
import { AdaptativeBatonnetComponent } from '../adaptative-batonnet/adaptative-batonnet.component';

@Component({
  selector: 'app-board-batonnets',
  imports: [AdaptativeBatonnetComponent],
  templateUrl: 'board-batonnets.component.html',
  styles: `
  #board {
    background-color: #994d00;
    display: inline-block;
    margin-left: 24%;
  }
  `
})
export class BoardBatonnetsComponent {

  public creerListeBatonnet() {
    return Array.from(
      {length: BoardBatonnetsComponent.nombreTotalBatonnets()}, 
      (_, i) => i + 1
    );
  }

  public static nombreTotalBatonnets() {
    return 20;
  }

}
