import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, effect, inject, signal} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormField, form, required, max, min} from '@angular/forms/signals';

interface ThemeData {
  hue: number;
  mode: '💻'|'☀️'|'🌑';
}

@Component({
  selector: 'mec-theme',
  imports: [FormField],
  templateUrl: './theme.html',
  styleUrl: './theme.css'
})
export class Theme {

  themeModel = signal<ThemeData>({
    hue: new Date().getHours() * 15,
    mode: '💻',
  });

  themeForm = form(this.themeModel, (schemaPath) => {
    required(schemaPath.hue);
    required(schemaPath.mode);
    max(schemaPath.hue, 360);
    min(schemaPath.hue, 0);
  });

  meta = inject(Meta);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      const DEG = this.themeForm.hue().value() +'deg';
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.style.setProperty('--hue', DEG);
        const BASE = .05;
        const C = 0;
        const pi = 3.14;
        const CALC = BASE + (Math.sin(0.6 * pi) * C);
        const THEMECOLOR = `oklch(50% ${CALC} ${DEG})`
        this.meta.updateTag({ content: THEMECOLOR }, 'name=theme-color');
      }
    })
  }

}
