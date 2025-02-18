import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContentService } from './content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterLink, RouterOutlet]
})
export class AppComponent {
  private contentService = inject(ContentService);

  title = 'personal-site';
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
