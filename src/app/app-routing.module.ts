import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    component: AuthComponent,
    path: 'auth',
  },
  {
    component: MainComponent,
    path: 'map',
  },
  {
    path: '**',
    redirectTo:'/map'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
