import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LodgingComponent } from './lodging/lodging.component';
import { RentalComponent } from './rental/rental.component';
import { RentalUnitComponent } from './rental-unit/rental-unit.component';
import { ReviewComponent } from './review/review.component';


const routes: Routes = [
  { path: '', component: LodgingComponent},
  // { path: 'rental', component: RentalComponent},
  { path: 'rental/:id', component: RentalComponent},
  { path: 'rentalUnit/:id', component: RentalUnitComponent},
  { path: 'review/:id', component: ReviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LodgingRoutingModule { }
