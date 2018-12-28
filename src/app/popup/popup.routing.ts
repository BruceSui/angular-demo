import { Routes, RouterModule } from '@angular/router';
import { PopupComponent } from './popup.component';

const routes: Routes = [
  { path: '', component: PopupComponent },
];

export const PopupRoutes = RouterModule.forChild(routes);
