import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from './page/page';
import { About } from './about/about';
const routes: Routes = [
  { path: '', component: About},
  { path: ':section', component: Page},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
