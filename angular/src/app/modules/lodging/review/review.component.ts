import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/data/review.model';
import { ReviewService } from 'src/app/services/lodging/review.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';



@Component({
  selector: 'uic-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  lodging: Lodging;

  constructor(private reviewService: ReviewService, private lodgingService: LodgingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getLodging();
  }

  get(): void {
    this.reviewService.get().subscribe((data) => {
      data.forEach((review) => this.reviews.push(review));
    });
  }

  getLodging(): void {
    const lodgingId = this.route.snapshot.paramMap.get('id');
    this.lodgingService.get().subscribe(lodgings => this.lodging = lodgings.find(lodging => lodging.id == lodgingId));
    this.getReviews(lodgingId);
  }
  // Get reviews of a lodging
  getReviews(lodgingId: string): void {
    this.reviewService.get().subscribe(reviews => this.reviews = reviews.filter(review => review.hotelId == lodgingId));
  }

}
