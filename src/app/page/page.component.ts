import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { Location } from "@angular/common";
import { filter, map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  chosenContent: any = {
    heading: null,
    img: null,
    copy: null,
    image: {
      width: null,
      height: null,
      formats: [
        null
      ]
    }
  };
  heading: string = '';
  currentExamples: any[] = [];
  constructor(location: Location, private router: Router, private contentService: ContentService, private activatedRoute: ActivatedRoute) {

   }

  ngOnInit(): void {


    this.activatedRoute.params.pipe(
			map(params => params.section)
		).subscribe((res: string) => {
      console.log(res);
      this.displayNav(res);
    });

  }

  displayNav(event:string) {    
      this.contentService.getContent().subscribe((content: Array<any>)  => {
        this.currentExamples = content.filter(section => section.link === "/" + event)[0].examples;
        this.displayContent(this.currentExamples[0]);
      })
  }


  displayContent(event:any) {
    this.chosenContent.heading = event.nav;
    this.chosenContent.img = event.img ? 'http://markecurtis.com/images/' + event.img : null;
    this.chosenContent.image = event.image;
    this.chosenContent.copy = event.copy
  }

}
