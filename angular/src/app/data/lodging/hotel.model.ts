import { Location } from "./location.model";
import { Review } from "./review.model";
import { Image } from "./image.model";
import { Amenity } from "./amenity.model";
import { Room } from "./room.model";

export class Lodging{
    hotelID: number;  //Hotel identifier
    name: string; //Name of the hotel
    description: string; //Description of the hotel
    location: Location; //Location of the hotel
    area: number; //Area of hotel
    reviews: Review[]; //List of review objects for hotel
    room: Room[]; //Container holding rental types and number of each
    images: Image[]; //Images of the hotel
    amenities: Amenity[]; //Amenities of the hotel
}