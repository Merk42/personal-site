import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cg',
  templateUrl: './cg.component.html',
  styleUrls: ['./cg.component.css']
})
export class CgComponent implements OnInit {
  image = '';
  copy = '';
  heading = ''

  content = [
    {
      "nav":"About",
      "copy":"In addition to web development, I also have a background in creating 3D models in 3ds Max."
    },
    {
      "nav":"Family Room",
      "img":"familyroom.jpg",
      "copy":"A room in my parents house. A demonstration for a prospective client that later helped with my current occupation."
    },
    {
      "nav":"Ferry Terminal",
      "img":"ferry.jpg",
      "copy":"One of many views of a future ferry terminal and boat basin."
    },
    {
      "nav":"Good Eats Kitchen",
      "img":"gekitchen.jpg",
      "copy":"Full website for the freelance graphic designer Monica Boeger."
    },
    {
      "nav":"Living Room",
      "img":"livingroom.jpg",
      "copy":"Another residential interior. Many measurements and pictures were used in creating this piece."
    },
    {
      "nav":"Building Exterior",
      "img":"hobokenexterior.jpg",
      "copy":"Work in progress of the exterior of a building in Hoboken. Also my first experiment with using Vray for textures and lighting."
    },
    {
      "nav":"Tunnel",
      "img":"tunnel.jpg",
      "copy":"A proposed tunnel for a college. The client was worried that the tunnel would feel like a cave, though the rendering showed otherwise."
    },
    {
      "nav":"Zork White House",
      "img":"zorkexterior.jpg",
      "copy":"You are West of a white house. There is a mailbox here."
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.displayContent(this.content[0]);
  }

  displayContent(event:any) {
    console.log('displayContent', event);
    this.image = event.img ? 'https://www.markecurtis.com/images/' + event.img : '';
    this.copy = event.copy;
    this.heading = event.nav;
  }

}
