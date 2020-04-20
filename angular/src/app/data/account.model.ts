import { Address } from './address.model';
import { Payment } from './payment.model';
import { Profile } from './profile.model';

/**
 * Represents the _Account_ model
 *
 * ```yaml
 * id: string;
 * address: Address;
 * name?: string;
 * payments: Payment[];
 * profiles: Profile[];
 * ```
 */
export interface Account {
  id: string;
  address: Address;
  name: string;
  payments: Payment[];
  profiles: Profile[];
}
