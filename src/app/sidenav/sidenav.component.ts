import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() chosencontent = new EventEmitter<any>();
  @Input() examples: any;
  currentIndex: number;
  showMobileNav = false;
  // activeIndex: number;
  constructor() {this.currentIndex = 0 }
  
  ngOnInit(): void {
  }
  pieceChosen(index:number) {
    this.currentIndex = index;
    const VIEWCONTENT = this.examples[index];
    console.log('view index', index);
    console.log('of ', this.examples);
    this.chosencontent.emit(VIEWCONTENT);
  }
  toggleSmNav() {
    this.showMobileNav = !this.showMobileNav;
  }
}
