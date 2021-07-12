import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsitesComponent } from './websites/websites.component';
import { CgComponent } from './cg/cg.component';
const routes: Routes = [
  { path: 'websites', component: WebsitesComponent },
  { path: 'cg', component: CgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
