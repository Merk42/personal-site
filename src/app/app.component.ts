import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContentService } from './content.service';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LogoComponent, RouterLink, RouterOutlet]
})
export class AppComponent {
  private contentService = inject(ContentService);

  mainNav: any[] = [];
  constructor() {
    this.contentService.getContent().subscribe((content: Array<any>)  => {
      this.mainNav = content;
    })
  }

  currentIndex = computed(() => {
    return this.contentService.allContent()?.findIndex(c => c.link === '/' + this.contentService.currentPageName())
  })

}
