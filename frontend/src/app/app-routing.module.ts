import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/auth/login/login.component';
import {FacadeComponent} from './components/auth/facade/facade.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {InsertProductComponent} from './components/products/insert-product/insert-product.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login-facade',
    component: FacadeComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'insert',
        component: InsertProductComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
