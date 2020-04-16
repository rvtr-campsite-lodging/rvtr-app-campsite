import { Location } from "./location.model";
import { Review } from "./review.model";
import { Image } from "./image.model";
import { Amenity } from "./amenity.model";
import { Room } from "./room.model";

/**
    Class representing an establishment that provides lodging. hotelID - Hotel identifier, name - Name of the hotel, description - Description of the hotel, 
    location - Location of the hotel, area - Area of hotel, reviews - List of review objects for hotel, rooms - Container holding rental types and number of each, 
    images - Images of the hotel, amenities - Amenities of the hotel
 */
export class Hotel{
    hotelID: number;
    name: string;
    description: string;
    location: Location;
    area: number;
    reviews: Review[];
    rooms: Room[];
    images: Image[];
    amenities: Amenity[];
}