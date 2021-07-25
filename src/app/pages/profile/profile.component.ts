import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  chosenContent = {};
  heading = '';
  content = [
    {
      "nav":"About"
    },
    {
      "nav":"Resume"
    }
  ]
  constructor() { }

  ngOnInit(): void {
    this.displayContent(this.content[0]);
  }

  displayContent(event:any) {
    this.heading = event.nav;
    this.chosenContent = event;
  }

}
