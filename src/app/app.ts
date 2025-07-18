import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Content } from './content';
import { Logo } from './logo/logo';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [Logo, RouterLink, RouterOutlet]
})
export class App {
  private contentService = inject(Content);

  mainNav = computed(() => {
    return this.contentService.allContent.value()
  })

  currentIndex = computed(() => {
    const INDEX = this.contentService.allContent.value()?.findIndex(c => c.link === '/' + this.contentService.currentPageName())
    if (typeof INDEX === 'undefined') {
      return -1
    }
    return INDEX
  })

}
