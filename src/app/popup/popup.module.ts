import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { AlertComponent } from './alert/alert.component';
import { PopupRoutes } from './popup.routing';

@NgModule({
  imports: [
    CommonModule,
    PopupRoutes,
  ],
  declarations: [
    PopupComponent,
    AlertComponent,
  ],
  entryComponents: [
    AlertComponent,
  ]
})
export class PopupModule { }
