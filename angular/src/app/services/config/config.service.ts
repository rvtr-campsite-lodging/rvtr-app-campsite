import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../data/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly config = 'assets/config.json';

  /**
   * Represents the _Config Service_ `constructor` method
   *
   * @param http HttpClient
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Represents the _Config Service_ `get` method
   */
  get() {
    return this.http.get<Config>(this.config);
  }
}
