import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core'
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appObserveElement]',
  exportAs: 'intersection',
})
export class ObserveElementDirective implements OnInit, OnDestroy {
  @Input() root: HTMLElement | null = null
  @Input() rootMargin = '0px 0px 0px 0px'
  @Input() threshold = 0
  @Input() debounceTime = 500
  @Input() isContinuous = false

  @Output() isIntersecting = new EventEmitter<boolean>()

  _isIntersecting = false
  subscription!: Subscription

  constructor (private element: ElementRef) {}

  ngOnInit () {
    this.subscription = this.createAndObserve()
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }

  createAndObserve () {
    const options: IntersectionObserverInit = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    }

    return new Observable<boolean>(subscriber => {
      const intersectionObserver = new IntersectionObserver(entries => {
        const { isIntersecting } = entries[0]
        subscriber.next(isIntersecting)

        isIntersecting &&
          !this.isContinuous &&
          intersectionObserver.disconnect()
      }, options)

      intersectionObserver.observe(this.element.nativeElement)

      return {
        unsubscribe () {
          intersectionObserver.disconnect()
        },
      }
    })
      .pipe(debounceTime(this.debounceTime))
      .subscribe(status => {
        this.isIntersecting.emit(status)
        this._isIntersecting = status
      })
  }
}
