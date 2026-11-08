import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FEATURE_LIST } from '../../mock/features.mock';
import { FeatureBorderDirective } from '../directive/feature-border.directive';

@Component({
  selector: 'app-homepage',
  imports: [
    FeatureBorderDirective,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: 'homepage.component.html',
  styleUrl: 'homepage.component.css'
})
export class HomepageComponent {

  featureList = signal(FEATURE_LIST);

}
