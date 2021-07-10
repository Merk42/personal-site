import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {
  image = '';
  copy = '';
  heading = ''
  constructor() { }
  

  ngOnInit(): void {
    
  }

  displayContent(event:any) {
    console.log('displayContent', event);
    this.image = 'https://www.markecurtis.com/images/' + event.img;
    this.copy = event.copy;
    this.heading = event.nav;
  }

}
