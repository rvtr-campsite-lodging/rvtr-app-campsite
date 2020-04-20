/** 
Represents a review oject. userId: user identifier, hitelId: hotel identifier, userName :reviewr's username
rating: given rating, content: content of the review, date: date review posted
**/
export class Review {
  reviewId: number;
  userId: number;
  hotelId: number;
  userName: string;
  rating: number;
  content: string;
  date: Date;
}