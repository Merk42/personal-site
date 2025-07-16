import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, resource, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Page } from './types';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Content {
  private http = inject(HttpClient);

  currentPageIndex = signal(0);
  currentPageName = signal('');
  currentExampleIndex = signal(0);

 allContent = resource({
    loader: () => {
      return fetch('content.json').then(
        (res) => res.json() as Promise<Array<Page>>
      );
    },
  });


  // allContent = toSignal(this.getContent())


  getContent() {
    return this.http.get<Array<Page>>('content.json').pipe(
      shareReplay(1)
    );
  }

  currentPage = computed<Page>(() => {
    if (typeof this.allContent.value() !== 'undefined') {
      const PAGE = this.allContent.value()?.find( (page:Page) => page.link === '/' + this.currentPageName());
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
