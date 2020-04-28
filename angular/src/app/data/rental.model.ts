import { RentalUnit } from './rental-unit.model';

/**
 * Represents the _Rental_ model
 *
 * ```yaml
 * id: string;
 * name: string;
 * rentalUnit: RentalUnit;
 * images: string[];
 * ```
 */
export interface Rental {
  id: string;
  name: string;
  rentalUnit: RentalUnit;
  images: string[];
  lodgingId: string;
  rentalUnitId: string;
}
