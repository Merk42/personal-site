import { Directive, ElementRef, OnInit, OnDestroy, input, output, inject } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {fromIntersectionObserver, IntersectionStatus} from './from-intersection-observer';

@Directive({
  selector: '[intersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  private element = inject(ElementRef);

  readonly intersectionDebounce = input(0);
  readonly intersectionRootMargin = input('0px');
  readonly intersectionRoot = input<HTMLElement>();
  readonly intersectionThreshold = input<number | number[]>();

  readonly visibilityChange = output<IntersectionStatus>();

  private destroy$ = new Subject();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
