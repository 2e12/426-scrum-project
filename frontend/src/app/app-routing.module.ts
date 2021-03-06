import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/auth/login/login.component';
import {FacadeComponent} from './components/auth/facade/facade.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {InsertProductComponent} from './components/products/insert-product/insert-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then(m => m.HomePageModule)
      }
    ]
  },
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
    path: 'products',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'insert',
        component: InsertProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
