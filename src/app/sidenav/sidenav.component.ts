import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() chosencontent = new EventEmitter<any>();
  @Input() content: any;
  constructor() { }
  
  ngOnInit(): void {
  }
  pieceChosen(index:number) {
    const VIEWCONTENT = this.content[index];
    console.log('view', VIEWCONTENT)
    this.chosencontent.emit(VIEWCONTENT);
  }

}
