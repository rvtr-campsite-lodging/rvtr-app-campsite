/**
 * represents a location object.
 *
 * ```yaml
 * locationId: number;
 * locationId: number;
 * address1: string;
 * address2: string;
 * city: string;
 * state: string;
 * zip: string;
 * latitude: number;
 * longitude: number;
 * cultureInfo: string;
 * ```
 */
export class Location {
  locationId: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  cultureInfo: string;
}
