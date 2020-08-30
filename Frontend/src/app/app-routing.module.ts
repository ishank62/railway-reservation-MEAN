import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationComponent,
  },
  { path: '**', redirectTo: '/reservation' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
