import { Directive, ElementRef, OnInit, OnDestroy, input, output } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {fromIntersectionObserver, IntersectionStatus} from './from-intersection-observer';

@Directive({
  selector: '[intersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  readonly intersectionDebounce = input(0);
  readonly intersectionRootMargin = input('0px');
  readonly intersectionRoot = input<HTMLElement>();
  readonly intersectionThreshold = input<number | number[]>();

  readonly visibilityChange = output<IntersectionStatus>();

  private destroy$ = new Subject();

  constructor(private element: ElementRef) {}

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
      takeUntil(this.destroy$)
    ).subscribe((status) => {
      this.visibilityChange.emit(status);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
