import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapComponent } from './bootstrap.component';
import { BootstrapRoutes } from './bootstrap.routing';

@NgModule({
  imports: [
    CommonModule,
    BootstrapRoutes,
  ],
  declarations: [BootstrapComponent]
})
export class BootstrapModule { }
