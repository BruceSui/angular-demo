import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule',  data: { preload: true } },
  { path: 'shop', loadChildren: './shop/shop.module#ShopModule',  data: { preload: true } },
  { path: 'bootstrap', loadChildren: './bootstrap/bootstrap.module#BootstrapModule',  data: { preload: true } },
  // { path: 'popup', loadChildren: './popup/popup.module#PopupModule',  data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
