import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SharedRoutes } from './shared.routing';
import { CarChioceComponent } from './car-chioce/car-chioce.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutes,
  ],
  declarations: [
    SharedComponent,
    FooterComponent,
    CarChioceComponent,
    AlertComponent,
  ],
  exports: [
    CarChioceComponent,
  ]
})
export class SharedModule { }
