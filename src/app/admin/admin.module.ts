import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { CrisesComponent } from './crises/crises.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { FormDemoComponent } from './form-demo/form-demo.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    FormsModule,
  ],
  declarations: [
    AdminComponent,
    CrisesComponent,
    DashboardComponent,
    HeroesComponent,
    LoginComponent,
    FormDemoComponent,
  ]
})
export class AdminModule { }
