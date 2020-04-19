import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: string = 'assets/config.json';

  /**
   * Represents the _Config Service_ `constructor` method
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Represents the _Config Service_ `get` method
   */
  get() {
    return this.http.get(this.config);
  }
}
