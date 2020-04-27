import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/data/rental.model';
import { RentalService } from 'src/app/services/lodging/rental.service';

@Component({
  selector: 'uic-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss'],
  providers:[ RentalService ]
})
export class RentalComponent implements OnInit {
  rentals: Rental[];
  selectedRental: Rental;

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  selectRental(rental: Rental) { this.selectedRental = rental; }

  getRentals(): void {
    this.rentalService.get().subscribe(rentals => this.rentals = rentals);
  }
}
