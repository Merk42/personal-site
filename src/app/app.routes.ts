import { Routes } from '@angular/router';



export const routes: Routes = [
  { path: '', loadComponent: () => import('./about/about').then(m => m.About)},
  { path: 'resume', loadComponent: () => import('./resume/resume').then(m => m.Resume)},
  { path: ':section', loadComponent: () => import('./page/page').then(m => m.Page)},
];
