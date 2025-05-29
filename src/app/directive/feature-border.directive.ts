import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appFeatureBorder]'
})
export class FeatureBorderDirective {
  private initialColor: string;
  featureType = input.required<string>();

  constructor(private el: ElementRef) {
    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '5px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = this.getBorderColor();
    this.setBorder(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    const color = this.initialColor;
    this.setBorder(color);
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

  private getBorderColor() {
    switch(this.featureType()) {
      case 'technique':
        return '#0099ff';
      default:
        return '#4080bf';
    }
  }

}
