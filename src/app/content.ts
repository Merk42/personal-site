import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, resource, signal } from '@angular/core';
import { Page } from './types';

@Injectable({
  providedIn: 'root'
})
export class Content {
  private http = inject(HttpClient);

  currentPageIndex = signal(0);
  currentPageName = signal('');
  currentExampleIndex = signal(0);

 allContent = resource({
    loader: async () => {
      const res = await fetch(`${environment.baseUrl}content.json`);
     return await (res.json() as Promise<Array<Page>>);
    },
  });

  async contentSections():Promise<Array<Page>> {
    const res = await fetch(`${environment.baseUrl}content.json`);
    return await res.json()
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
    return this.currentPage().examples.map(example => {
      return {
        nav: example.nav,
        copy: example.copy
      }
    })
  })

}
