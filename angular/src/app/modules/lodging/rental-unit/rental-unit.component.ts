import { Component, OnInit } from '@angular/core';
import { RentalUnit } from 'src/app/data/rental-unit.model';
import { RentalUnitService } from 'src/app/services/lodging/rental-unit.service';
import { RentalService } from 'src/app/services/lodging/rental.service';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/data/rental.model';

@Component({
  selector: 'uic-rental-unit',
  templateUrl: './rental-unit.component.html',
  styleUrls: ['./rental-unit.component.scss'],
})
export class RentalUnitComponent implements OnInit {
  rentalUnits: RentalUnit[] = [];
  rental: Rental;
  rentalUnit: RentalUnit;

  constructor(private rentalUnitService: RentalUnitService, private rentalService: RentalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRental();
  }

  get(): void {
    this.rentalUnitService.get().subscribe((data) => {
      data.forEach((rentalUnit) => this.rentalUnits.push(rentalUnit));
    });
  }

    // get selected lodging
    getRental(): void {
      const rentalId = this.route.snapshot.paramMap.get('id');
      // for working with API
      // this.rentalService.get(rentalId).subscribe(rentals => this.rental = rentals[0]);
      this.rentalService.get().subscribe(rentals => this.rental = rentals.find(rental => rental.id == rentalId));
      // this.getRentalUnits(this.rental.rentalUnitId);
      this.rentalUnitService.get().subscribe(rentalUnits => this.rentalUnit = rentalUnits.find(rentalUnit => rentalUnit.id == this.rental.rentalUnitId));
    }
    // // Get rental unit of a rental
    // getRentalUnits(rentalUnitId: string): void {
    //   // for working with API
    //   // this.rentalUnitService.get(rentalUnitId).subscribe(rentals => this.rentalUnit = rentals[0]);

    //   this.rentalUnitService.get().subscribe(rentalUnits => this.rentalUnit = rentalUnits.find(rentalUnit => rentalUnit.id == rentalUnitId)[0]);
    // }
}
