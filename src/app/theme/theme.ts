import { Component, effect, model} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mec-theme',
  imports: [FormsModule],
  templateUrl: './theme.html',
  styleUrl: './theme.css'
})
export class Theme {
  hue = model(150);

  constructor() {
    effect(() => {
      const DEG = this.hue() +'deg';
      document.documentElement.style.setProperty('--hue', DEG);
    })
  }

}
