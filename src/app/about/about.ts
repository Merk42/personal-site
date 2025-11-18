import { Component, effect, inject } from '@angular/core';
import { Content } from '../content';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'mec-about',
    templateUrl: './about.html',
    styleUrls: ['./about.css'],
    imports: [RouterLink]
})
export class About {
    contentService = inject(Content);
    constructor() {
    effect(() => {
      this.contentService.currentPageName.set('');
    })
  }
}
