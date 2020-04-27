import { Component, OnInit } from '@angular/core';
import { RentalUnit } from 'src/app/data/rental-unit.model';
import { RentalUnitService } from 'src/app/services/lodging/rental-unit.service';
import sampleData from './rental-unit-example.json';

@Component({
  selector: 'uic-rental-unit',
  templateUrl: './rental-unit.component.html',
  styleUrls: ['./rental-unit.component.scss'],
})
export class RentalUnitComponent implements OnInit {
  rentalUnit: any = sampleData;
  //rentalUnit: RentalUnit;
  rentalUnits: RentalUnit[];

  constructor(private rentalUnitService: RentalUnitService) {}

  ngOnInit(): void {
    // this.rentalUnitService.get().subscribe(data => {
    //   this.rentalUnits.push(data);
    // });
  }
}
