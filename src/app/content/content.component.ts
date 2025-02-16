import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
    standalone: false
})
export class ContentComponent implements OnInit {
  @Input() contentToDisplay: any;
  constructor() { }

  ngOnInit(): void {
  }

}
