import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

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
export class Page implements OnInit {
  viewportScroller = inject(ViewportScroller);
  contentService = inject(Content);
  private activatedRoute = inject(ActivatedRoute);

  demo = computed(() => {
    return this.contentService.currentPage()
  })

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
			map(params => params['section'])
		).subscribe((res: string) => {
      this.viewportScroller.scrollToPosition([0, 0]);
      this.contentService.currentPageName.set(res);
      this.contentService.currentExampleIndex.set(0);
    });
  }

  onVisibilityChanged(index: number, status: IntersectionStatus) {
    console.log(index, status);
    if (status === 'Visible') {
      this.contentService.currentExampleIndex.set(index)
    }
  }
}
