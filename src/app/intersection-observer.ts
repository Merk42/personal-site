import { DestroyRef, Directive, ElementRef, OnInit, input, output, inject } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromIntersectionObserver, IntersectionStatus } from './from-intersection-observer';

@Directive({
  selector: '[intersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit {
  private element = inject(ElementRef);
  destroyRef = inject(DestroyRef);

  readonly intersectionDebounce = input(0);
  readonly intersectionRootMargin = input('0px');
  readonly intersectionRoot = input<HTMLElement>();
  readonly intersectionThreshold = input<number | number[]>();

  readonly visibilityChange = output<IntersectionStatus>();


  ngOnInit() {
    const element = this.element.nativeElement;
    const config = {
      root: this.intersectionRoot(),
      rootMargin: this.intersectionRootMargin(),
      threshold: this.intersectionThreshold()
    };

    fromIntersectionObserver(
      element,
      config,
      this.intersectionDebounce()
    ).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((status) => {
      this.visibilityChange.emit(status);
    });
  }
}
