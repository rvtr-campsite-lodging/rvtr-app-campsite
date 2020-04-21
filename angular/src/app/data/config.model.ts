/**
 * Represents the _Config_ model
 *
 * ```yaml
 * api: object;
 * ```
 */
export interface Config {
  api: {
    account: string;
    booking: string;
    lodging: string;
  };
}
