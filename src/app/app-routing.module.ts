import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { WebsitesComponent } from './pages/websites/websites.component';
import { CgComponent } from './pages/cg/cg.component';
const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'websites', component: WebsitesComponent },
  { path: 'cg', component: CgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
