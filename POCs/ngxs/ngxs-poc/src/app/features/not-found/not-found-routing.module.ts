import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  // { path: '**', loadChildren: () => import('./not-found.module').then(mod => mod.NotFoundModule) }
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotFoundRoutingModule {
}
