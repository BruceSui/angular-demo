import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  // { path: '', component: HomeComponent },

];

export const HomeRoutes = RouterModule.forChild(routes);
