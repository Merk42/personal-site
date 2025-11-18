import { Routes } from '@angular/router';
import { Page } from './page/page';
import { About } from './about/about';
import { Resume } from './resume/resume';
export const routes: Routes = [
  { path: '', component: About},
  { path: 'resume', component: Resume},
  { path: ':section', component: Page},
];
