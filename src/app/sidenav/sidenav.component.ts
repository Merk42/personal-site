import { Component, inject, input, output } from '@angular/core';
import { Example } from '../types';
import { ContentService } from '../content.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  imports: [JsonPipe]
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
