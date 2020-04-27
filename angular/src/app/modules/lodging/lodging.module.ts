import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingRoutingModule } from './lodging-routing.module';
import { LodgingComponent } from './lodging/lodging.component';
import { RentalComponent } from './rental/rental.component';
import { RentalUnitComponent } from './rental-unit/rental-unit.component';
import { ReviewComponent } from './review/review.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [LodgingComponent, RentalComponent, RentalUnitComponent, ReviewComponent],
  imports: [
    CommonModule,
    LodgingRoutingModule,
    HttpClientModule,
  ]
})
export class LodgingModule { }
