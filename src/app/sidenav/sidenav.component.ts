import { Component, inject } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  imports: []
})
export class SidenavComponent {
  contentService = inject(ContentService);
  showMobileNav = false;

  pieceChosen(index:number) {
    this.contentService.currentExampleIndex.set(index);
  }

  toggleSmNav() {
    this.showMobileNav = !this.showMobileNav;
  }
}
