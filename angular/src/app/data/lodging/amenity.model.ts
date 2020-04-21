/**
 * Represents the amenity model. amenityId: The identifier for the amenity, name: The name of the amenity,
 * category: category of room the amenity is available to, pricePerDay: daily surcharge for using the amenity.
 *
 * ```yaml
 * amenityId: number;
 * name: string;
 * category: string;
 * pricePerDay: number;
 * ```
 */
export class Amenity {
  amenityId: number;
  name: string;
  category: string;
  pricePerDay: number;
}
