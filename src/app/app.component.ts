import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personal-site';

  toggleMenu(){
    console.log('toggle')
    const BODYDOM = document.getElementsByTagName('body')[0] as HTMLElement;
    BODYDOM.classList.toggle("mobileMenu");
  }
}
