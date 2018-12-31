import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SharedRoutes } from './shared.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutes,
  ],
  declarations: [
    SharedComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
