import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { map } from 'rxjs/operators';
import { ContentComponent } from '../content/content.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  imports: [ContentComponent, SidenavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  private contentService = inject(ContentService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
			map(params => params.section)
		).subscribe((res: string) => {
      console.log('router event, page');
      this.contentService.currentPageName.set(res);
      this.contentService.currentExampleIndex.set(0);
    });
  }
}
