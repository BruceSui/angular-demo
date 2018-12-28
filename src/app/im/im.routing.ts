import { Routes, RouterModule } from '@angular/router';
import { ImComponent } from './im.component';

const routes: Routes = [
  { path: 'im', component: ImComponent },
];

export const ImRoutes = RouterModule.forChild(routes);
