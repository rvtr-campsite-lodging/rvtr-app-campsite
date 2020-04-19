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
interface Account {
  id: string;
  address: Address;
  name?: string;
  payments: Payment[];
  profiles: Profile[];
}
