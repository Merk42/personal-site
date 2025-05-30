import { Component, computed, inject, signal } from '@angular/core';
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

  mainNav = signal<any[]>([]);
  constructor() {
    this.contentService.getContent().subscribe((content: Array<any>)  => {
      this.mainNav.set(content);
    })
  }

  currentIndex = computed(() => {
    return this.contentService.allContent()?.findIndex(c => c.link === '/' + this.contentService.currentPageName())
  })

}
