import { Component, effect, inject } from '@angular/core';
import { Content } from '../content';
@Component({
    selector: 'mec-about',
    templateUrl: './about.html',
    styleUrls: ['./about.css']
})
export class About {
    contentService = inject(Content);
    constructor() {
    effect(() => {
      this.contentService.currentPageName.set('');
    })
  }
}
