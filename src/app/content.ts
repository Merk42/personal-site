import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Page } from './types';

@Injectable({
  providedIn: 'root'
})
export class Content {
  private http = inject(HttpClient);

  currentPageIndex = signal(0);
  currentPageName = signal('');
  currentExampleIndex = signal(0);

  allContent = toSignal(this.getContent())


  getContent() {
    return this.http.get<Array<Page>>('/assets/content.json');
  }

  currentPage = computed<Page>(() => {
    if (this.allContent() && this.allContent()?.length) {
      const PAGE = this.allContent()?.find( page => page.link === '/' + this.currentPageName());
      if (PAGE) {
        return PAGE
      }
      return {
        id:'',
        link:'',
        name:'',
        examples: []
      }
    }
    return {
      id:'',
      link:'',
      name:'',
      examples: []
    }
  })

  currentNav = computed<{nav:string,copy:string}[]>(() => {
    // TOOD clean this up to return array of nav / copy
    return this.currentPage().examples.map(example => {
      return {
        nav: example.nav,
        copy: example.copy
      }
    })
  })
  
}
