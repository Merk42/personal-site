import { Routes } from '@angular/router';
import { Page } from './page/page';
import { About } from './about/about';
export const routes: Routes = [
  { path: '', component: About},
  { path: ':section', component: Page},
];
