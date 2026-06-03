import { Component, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { Content } from '../content';
import { RouterLink } from '@angular/router';
import { Theme } from '../theme/theme';
@Component({
    selector: 'mec-about',
    templateUrl: './about.html',
    styleUrl: './about.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, Theme]
})
export class About {
    contentService = inject(Content);
    constructor() {
    effect(() => {
      this.contentService.currentPageName.set('');
    })
  }
}
