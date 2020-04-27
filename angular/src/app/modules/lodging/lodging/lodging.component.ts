import { Component, OnInit } from '@angular/core';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { Lodging } from 'src/app/data/lodging.model';
import sampleData from './lodging-example.json';


@Component({
  selector: 'uic-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.scss']
})
export class LodgingComponent implements OnInit {
  lodging: any = sampleData;
  lodgings = sampleData;

  constructor(private lodgingService: LodgingService) { }

  ngOnInit(): void {
    this.lodgingService.get().subscribe(data => {
      this.lodgings.push(data);
    });
  }
}
