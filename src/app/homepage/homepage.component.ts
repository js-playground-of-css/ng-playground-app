import { Component, signal } from '@angular/core';
import { FEATURE_LIST } from '../../mock/features.mock';
import { FeatureBorderDirective } from '../directive/feature-border.directive';

@Component({
  selector: 'app-homepage',
  imports: [FeatureBorderDirective],
  templateUrl: 'homepage.component.html',
  styles: ``
})
export class HomepageComponent {

  featureList = signal(FEATURE_LIST);

}
