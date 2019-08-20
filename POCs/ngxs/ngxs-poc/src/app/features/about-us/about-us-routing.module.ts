import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';

const routes: Routes = [
  // { path: 'about-us', loadChildren: () => import('./about-us.module').then(mod => mod.AboutUsModule)},
  { path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AboutUsRoutingModule {
 }
