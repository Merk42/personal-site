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

  content = [
    {
      "nav":"About",
      "copy":"Some of the many web pages I've worked on over the years."
    },
    {
      "nav":"Markecurtis",
      "img":"mec.png",
      "copy":"Surprise! I did this site, too. Responsive web design with a separate mobile style sheet."
    },
    {
      "nav":"Tarela People",
      "img":"tarela-people.jpg",
      "copy":"Webpage for Tarela People: Luxury Hospitality Headhunter."
    },
    {
      "nav":"Jingle Ball",
      "img":"z100-jingle-ball-2012.jpg",
      "copy":"Webpage promoting the Z100's Jingle Ball concert in Madison Square Garden. A mobile version was also created for ~25% of total visitors."
    },
    {
      "nav":"MonicaLauren Design",
      "img":"monicalauren-design.jpg",
      "copy":"Full website for the freelance graphic designer Monica Boeger."
    },
    {
      "nav":"St. Mary's",
      "img":"st-marys.jpg",
      "copy":"Information page for St. Mary's charity. Complete with an interactive view of a proposed Activity Center as well as a way for visitors to create a playlist."
    },
    {
      "nav":"Book Cafe",
      "img":"book-cafe.jpg",
      "copy":"Page where visitors with accounts can download assets for the six New York Clear Channel radio stations."
    },
    {
      "nav":"Media Relations",
      "img":"media-relations.jpg",
      "copy":"Page where visitors with accounts can download assets for the six New York Clear Channel radio stations."
    },
    {
      "nav":"Health Movement",
      "img":"health-movement.jpg",
      "copy":"Users were able to log their miles run/walk/biked and the total of all users was added to span the distance from New York to Los Angeles."
    },
    {
      "nav":"Get Dropped NYC",
      "img":"get-dropped-nyc.jpg",
      "copy":"Contest page for Sun Drop details events and prizes visitors could win."
    },
    {
      "nav":"Brookhaven 2030",
      "img":"brookhaven2030.gif",
      "copy":"Website for the massive 20 year planning of the town of Brookhaven. The first time I had done interactive elements like PHP forms, and LimeSurvey."
    },
    {
      "nav":"V Baras",
      "img":"vbaras.jpg",
      "copy":"Reworked existing site to flash for a smoother, more visually appealing, experience."
    }
  ]

  constructor() { }
  

  ngOnInit(): void {
    this.displayContent(this.content[0]);
  }

  displayContent(event:any) {
    this.image = event.img ? 'https://www.markecurtis.com/images/' + event.img : '';
    this.copy = event.copy;
    this.heading = event.nav;
  }

}
