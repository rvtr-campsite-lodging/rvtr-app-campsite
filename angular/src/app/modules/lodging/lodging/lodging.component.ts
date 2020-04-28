import { Component, OnInit } from '@angular/core';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { Lodging } from 'src/app/data/lodging.model';

@Component({
  selector: 'uic-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.scss'],
})
export class LodgingComponent implements OnInit {
  lodgings:   Lodging[] = [];

  constructor(private lodgingService: LodgingService) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.lodgingService.get().subscribe(lodgings => this.lodgings = lodgings);
  }

  trackByLodgingId(index: number, lodging: any){
    return lodging.id;
  }
}
