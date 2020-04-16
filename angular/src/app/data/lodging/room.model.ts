import { Image } from "./image.model";
export class Room {
    roomId: number;                     // Room Identifier
    type: string;                       // Type of room
    description: string;                // Description of the room
    baseCapacity: number;               // The base number of people included in price
    maxCapacity: number;                // The maximum number of people allowed to stay in the room
    pricePerNight: number;              // Price per night for base capacity
    pricePerAdditionalPerson: number;   // Price per night for each additional person
    images: Image[];                    // Images of the room
    beds: string[];                     // Number of beds
    bathroom: number;                   // Number of bathrooms
    bedrooms: number;                   // Number of bedrooms
}