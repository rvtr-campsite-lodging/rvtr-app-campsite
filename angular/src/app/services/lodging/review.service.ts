import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../../data/lodging/review.model';
import { Config } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(readonly http: HttpClient, readonly config: Config) {}

  /**
   * Returns all the reviews from lodging api.
   *
   * @returns Observable array of reviews
   */
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.config.review.getReviewUrl);
  }

  /**
   * Sends review to lodging api to be added.
   *
   * @param review Review
   * @returns review that was added
   */
  postReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.config.review.postReviewUrl, review);
  }

  /**
   * Sends Review to lodging api to be updated.
   *
   * @param review Review
   * @returns review that was updated
   */
  putReview(review: Review): Observable<Review> {
    return this.http.put<Review>(this.config.review.putReviewUrl, review);
  }

  /**
   * Delete review from lodging api.
   *
   * @param id number
   * @returns review that was deleted
   */
  deleteReview(id: number): Observable<Review> {
    const url = `${this.config.review.deleteReviewUrl}/${id}`;

    return this.http.delete<Review>(url);
  }
}
