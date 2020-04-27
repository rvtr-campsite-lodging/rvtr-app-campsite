import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { RentalUnit } from '../../data/rental-unit.model';

@Injectable({
  providedIn: 'root'
})
export class RentalUnitService {
  private readonly apiUrl$: Observable<string>;

    /**
   * Represents the _RentalUnit Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => cfg.api.rentalUnit));
  }

  /**
   * Represents the _RentalUnit Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url, { params: { id } }))
    );
  }

  /**
   * Represents the _RentalUnit Service_ `get` method
   *
   * @param id string
   */
  get(id?: string): Observable<RentalUnit[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<RentalUnit[]>(url, options)));
  }

  /**
   * Represents the _RentalUnit Service_ `post` method
   *
   * @param rentalUnit RentalUnit
   */
  post(rentalUnit: RentalUnit): Observable<boolean> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, rentalUnit)));
  }

  /**
   * Represents the _RentalUnit Service_ `put` method
   *
   * @param rentalUnit RentalUnit
   */
  put(rentalUnit: RentalUnit): Observable<RentalUnit> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.put<RentalUnit>(url, rentalUnit)));
  }
}
