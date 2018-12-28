import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from './bootstrap.component';

const routes: Routes = [
  { path: '', component: BootstrapComponent },
];

export const BootstrapRoutes = RouterModule.forChild(routes);
