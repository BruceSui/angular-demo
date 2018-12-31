import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SharedComponent } from './shared.component';

const routes: Routes = [
  { path: '', component: SharedComponent },
  { path: 'footer', component: FooterComponent },
];

export const SharedRoutes = RouterModule.forChild(routes);
