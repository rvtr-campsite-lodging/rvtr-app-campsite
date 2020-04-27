import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/data/review.model';
import { ReviewService } from 'src/app/services/lodging/review.service';


@Component({
  selector: 'uic-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviews = [];

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.reviewService.get().subscribe(data => {
      this.reviews.push(data);
    });
  }
}
