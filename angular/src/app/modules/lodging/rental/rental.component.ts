import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/data/rental.model';
import { RentalService } from 'src/app/services/lodging/rental.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';


@Component({
  selector: 'uic-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss'],
  // providers:[ RentalService ]
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  lodging: Lodging;

  constructor(private rentalService: RentalService, private lodgingService: LodgingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.get();
    this.getLodging();
  }

  // // get all rentals
  // get(): void {
  //   this.rentalService.get().subscribe(rentals => this.rentals = rentals);
  // }

  // get selected lodging
  getLodging(): void {
    const lodgingId = this.route.snapshot.paramMap.get('id');
    // for working with API
    // this.lodgingService.get(lodgingId).subscribe(lodging => this.lodging = lodging[0]);
    this.lodgingService.get().subscribe(lodgings => this.lodging = lodgings.find(lodging => lodging.id == lodgingId));
    this.getRentals(lodgingId);
  }
  // Get rentals of a lodging
  getRentals(lodgingId: string): void {
    // for working with API
    // this.rentalService.getByLodging(lodgingId).subscribe(rentals => this.rentals = rentals);
    this.rentalService.get().subscribe(rentals => this.rentals = rentals.filter(rental => rental.lodgingId == lodgingId));
  }
}
