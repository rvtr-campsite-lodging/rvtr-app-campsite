import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Config } from './config';
import { Review } from 'src/app/data/lodging/review.model';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let reviewService: ReviewService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let config: Config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewService, Config],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    reviewService = TestBed.inject(ReviewService);
    config = TestBed.inject(Config);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // GET TEST
  describe('#getReviews', () => {
    let expectedReviews: Review[];

    beforeEach(() => {
      reviewService = TestBed.inject(ReviewService);
      expectedReviews = [
        { reviewId: 1, userId: 1, userName: ' ' },
        { reviewId: 2, userId: 1, userName: ' ' },
      ] as Review[];
    });

    it('should return expected reviews', () => {
      reviewService
        .getReviews()
        .subscribe(
          (reviews) => expect(reviews).toEqual(expectedReviews, 'should return expected reviews'),
          fail
        );

      const req = httpTestingController.expectOne(config.review.getReviewUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedReviews);
    });
  });
  // PUT TEST
  describe('#putReview', () => {
    it('should update a review and return it', () => {
      const review: Review = {
        reviewId: 2,
        userId: 1,
        userName: 's',
        hotelId: 1,
        rating: 3,
        content: '',
        date: null,
      };

      reviewService
        .putReview(review)
        .subscribe(
          (reviewReturned) =>
            expect(reviewReturned).toEqual(review, 'should return the review sent'),
          fail
        );

      const req = httpTestingController.expectOne(config.review.putReviewUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(review);

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: review });
      req.event(expectedResponse);
    });
  });

  // POST TEST
  describe('#postReview', () => {
    it('should post a new review and return it', () => {
      const review: Review = {
        reviewId: 3,
        userId: 1,
        userName: 's',
        hotelId: 1,
        rating: 3,
        content: '',
        date: null
      };

      reviewService
        .postReview(review)
        .subscribe(
          (reviewReturned) => expect(reviewReturned).toEqual(review, 'should return the review added'),
          fail
        );

      const req = httpTestingController.expectOne(config.review.postReviewUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(review);

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: review });
      req.event(expectedResponse);
    });
  });

  // DELETE TEST
  describe('#deleteReview', () => {
    it('should delete a review', () => {
      const review: Review = {
        reviewId: 3,
        userId: 1,
        userName: 's',
        hotelId: 1,
        rating: 3,
        content: '',
        date: null
       };

      reviewService.deleteReview(3).subscribe((data: any) => {
        expect(data).toBe(review);
      });

      const req = httpTestingController.expectOne(config.review.deleteReviewUrl+'/3');
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: review });
      req.event(expectedResponse);
    });
  });
});
