import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() chosencontent = new EventEmitter<any>();
  @Input() content: any;
  currentIndex: number;
  // activeIndex: number;
  constructor() {this.currentIndex = 0 }
  
  ngOnInit(): void {
  }
  pieceChosen(index:number) {
    this.currentIndex = index;
    const VIEWCONTENT = this.content[index];
    this.chosencontent.emit(VIEWCONTENT);
  }

}
