import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  heading = '';
  content = [
    {
      "nav":"About"
    },
    {
      "nav":"Resume"
    },
    {
      "nav":"Contact"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  displayContent(event:any) {
    console.log('displayContent', event);
    this.heading = event.nav;
  }

}
