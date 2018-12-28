import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { AlertComponent } from '../popup/alert/alert.component';
import { AppModule } from '../app.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes,
    FormsModule,
  ],
  declarations: [HomeComponent],
  providers: [AppModule],
})
export class HomeModule { }
