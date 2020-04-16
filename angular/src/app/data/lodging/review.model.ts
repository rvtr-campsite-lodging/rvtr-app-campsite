export class Review {
  userId : number; // user identifier 
  hotelId : number; // hotel identifier
  userName : string; // reviewr's username
  rating : number; // given rating
  content : string; // content of the review
  date : Date; // date review posted
}