import { Component, effect, inject, model} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'mec-theme',
  imports: [FormsModule],
  templateUrl: './theme.html',
  styleUrl: './theme.css'
})
export class Theme {
  hue = model(150);
  meta = inject(Meta);
  constructor() {
    effect(() => {
      const DEG = this.hue() +'deg';
      document.documentElement.style.setProperty('--hue', DEG);
      const BASE = .05;
      const C = 0;
      const pi = 3.14;
      const CALC = BASE + (Math.sin(0.6 * pi) * C);
      const THEMECOLOR = `oklch(50% ${CALC} ${DEG});`
      this.meta.updateTag({ content: THEMECOLOR }, 'name=theme-color');
    })
  }

}
