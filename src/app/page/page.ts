import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { About } from '../about/about';
import { Content } from '../content';
import { Resume } from '../resume/resume';
import { IntersectionObserverDirective } from '../intersection-observer';
import { IntersectionStatus } from '../from-intersection-observer';

@Component({
  selector: 'app-page',
  templateUrl: './page.html',
  styleUrls: ['./page.css'],
  imports: [About, Resume, RouterLink, IntersectionObserverDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page {
  viewportScroller = inject(ViewportScroller);
  contentService = inject(Content);
  readonly section = input('');

  constructor() {
    effect(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
      this.contentService.currentPageName.set(this.section());
      this.contentService.currentExampleIndex.set(0);
    })
  }

  demo = computed(() => {
    return this.contentService.currentPage()
  })

  onVisibilityChanged(index: number, status: IntersectionStatus) {
    if (status === 'Visible') {
      this.contentService.currentExampleIndex.set(index)
    }
  }
}
