import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { path: '', component: AboutComponent},
  { path: ':section', component: PageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
