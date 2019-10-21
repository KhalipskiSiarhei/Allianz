import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'faq',
    loadChildren: () => import('./features/faq/faq.module').then(mod => mod.FaqModule)
   },
  {
    path: 'about-us',
     loadChildren: () => import('./features/about-us/about-us.module').then(mod => mod.AboutUsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
