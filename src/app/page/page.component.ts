import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

import { AboutComponent } from '../about/about.component';
import { ContentService } from '../content.service';
import { ObserveElementDirective } from '../intersection-observer.directive';
import { ResumeComponent } from '../resume/resume.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  imports: [AboutComponent, ObserveElementDirective, ResumeComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  viewportScroller = inject(ViewportScroller);
  contentService = inject(ContentService);
  private activatedRoute = inject(ActivatedRoute);

  demo = computed(() => {
    return this.contentService.currentPage()
  })

  highlighted = signal<number>(0)

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
			map(params => params.section)
		).subscribe((res: string) => {
      this.viewportScroller.scrollToPosition([0, 0]);
      this.contentService.currentPageName.set(res);
      this.contentService.currentExampleIndex.set(0);
    });
  }

  isIntersecting (status: boolean, index: number) {
    console.log('Element #' + index + ' is intersecting ' + status)
    if (status) {
      this.highlighted.set(index-1)
    }
  }
}
