import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ContentService } from './content.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'personal-site';
  mainNav: any[] = [];
  currentIndex = 0;
  constructor(router:Router, private contentService: ContentService) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.currentIndex = this.mainNav.findIndex(x => x.link === event.url);
      }
    });
    this.contentService.getContent().subscribe((content: Array<any>)  => {
      console.log('subscribed content of ', content);
      this.mainNav = content;
    })
  }
  
  ngOnInit() {
    /*
    this.contentService.getContent().subscribe(content => {
      console.log('subscribed content of ', content);
      this.mainNav = content;
    })
    */
  }
  
  toggleMenu(){
    const BODYDOM = document.getElementsByTagName('body')[0] as HTMLElement;
    BODYDOM.classList.toggle("mobileMenu");
  }
}
