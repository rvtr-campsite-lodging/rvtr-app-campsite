import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Rental } from '../../data/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private readonly apiUrl$: Observable<string>;

  /**
   * Represents the _Rental Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => cfg.api.rental));
  }

  /**
   * Represents the _Rental Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url, { params: { id } }))
    );
  }

  /**
   * Represents the _Rental Service_ `get` method
   *
   * @param id string
   */
  get(id?: string): Observable<Rental[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Rental[]>(url, options)));
  }

  /**
   * Represents the _Rental Service_ `post` method
   *
   * @param rental Rental
   */
  post(rental: Rental): Observable<boolean> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, rental)));
  }

  /**
   * Represents the _Rental Service_ `put` method
   *
   * @param rental Rental
   */
  put(rental: Rental): Observable<Rental> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.put<Rental>(url, rental)));
  }
}
