import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personal-site';
  mainNav = [
    {
      "id":"about",
      "link":"/profile",
      "name":"Profile"
    },
    {
      "id":"past",
      "link":"/websites",
      "name":"Websites"
    },
    {
      "id":"cg",
      "link":"/cg",
      "name":"3D"
    }
  ]
  currentIndex = 0;
  constructor(router:Router) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.currentIndex = this.mainNav.findIndex(x => x.link === event.url);
        console.log('currentIndex is', this.currentIndex);
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }
  
  toggleMenu(){
    console.log('toggle')
    const BODYDOM = document.getElementsByTagName('body')[0] as HTMLElement;
    BODYDOM.classList.toggle("mobileMenu");
  }
}
