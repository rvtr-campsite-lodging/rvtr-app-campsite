import { Image } from './image.model';
import { Bed } from './bed.model';
/**
 * Represents the type of room lodigng contains. Each type has an identifier along with a descripiction giving the base capacity priced
 * at pricePerNight, and the maxCapacity which is priced at pricePerAdditionalPerson. It also contains a list of images and the number
 * of rooms.
 *
 * ```yaml
 * roomTypeId: number;
 * name: string;
 * beds: Bed[];
 * bathrooms: number;
 * bedrooms: number;
 * baseCapacity: number;
 * maxCapacity: number;
 * pricePerNight: number;
 * pricePerAdditionalPerson: number;
 * description: string;
 * images: Image[];
 * ```
 */
export class RoomType {
  roomTypeId: number;
  name: string;
  beds: Bed[];
  bathrooms: number;
  bedrooms: number;
  baseCapacity: number;
  maxCapacity: number;
  pricePerNight: number;
  pricePerAdditionalPerson: number;
  description: string;
  images: Image[];
}
