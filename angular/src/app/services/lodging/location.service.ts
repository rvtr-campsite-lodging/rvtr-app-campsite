import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/data/lodging/location.model';
import { Config } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient, private config: Config) {}

  /**
   * Returns all the locations from the location api.
   *
   * @returns Observable array of Locations
   */
  getLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(this.config.location.getLocationUrl);
  }

  /**
   * Sends Location to the location api to be added.
   *
   * @param location Location
   * @returns Obervable<Location>
   */
  postLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.config.location.postLocationUrl, location);
  }

  /**
   * Sends Location to the location api to be updated.
   *
   * @param location Location
   * @returns location that was updated
   */
  putLocation(location: Location): Observable<Location> {
    return this.http.put<Location>(this.config.location.putLocationUrl, location);
  }

  /**
   * Delete Location from the location api.
   *
   * @param id number
   * @returns location that was deleted
   */
  deleteLocation(id: number): Observable<Location> {
    const url = `${this.config.location.deleteLocationUrl}/${id}`;

    return this.http.delete<Location>(url);
  }
}
