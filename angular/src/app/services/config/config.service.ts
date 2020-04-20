import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/data/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config = 'assets/config.json';

  /**
   * Represents the _Config Service_ `constructor` method
   *
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Represents the _Config Service_ `get` method
   */
  get() {
    return this.http.get<Config>(this.config);
  }
}
