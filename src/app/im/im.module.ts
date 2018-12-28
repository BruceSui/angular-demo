import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImComponent } from './im.component';
import { ImRoutes } from './im.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImRoutes,
  ],
  declarations: [ImComponent]
})
export class ImModule { }
