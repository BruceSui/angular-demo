import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CrisesComponent } from './crises/crises.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   children: [
          { path: 'crises', component: CrisesComponent },
          { path: 'heroes', component: HeroesComponent },
          { path: '', component: DashboardComponent }
        // ]
      // }
    ],
  },
  { path: 'login', component: LoginComponent },
];

export const AdminRoutes = RouterModule.forRoot(routes);
