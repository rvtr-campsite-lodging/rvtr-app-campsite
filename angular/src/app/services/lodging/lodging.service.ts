import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Lodging } from '../../data/lodging.model';

@Injectable({
  providedIn: 'root',
})
export class LodgingService {
  private readonly apiUrl$: Observable<string>;

  /**
   * Represents the _Lodging Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => cfg.api.lodging));
  }

  /**
   * Represents the _Lodging Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url, { params: { id } }))
    );
  }

  /**
   * Represents the _Lodging Service_ `get` method
   *
   * @param id string
   */
  get(id?: string): Observable<Lodging[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Lodging[]>(url, options)));
  }

    /**
   * Represents the _Lodging Service_ `get` method
   *
   * @param id string
   */
  getAllByCity(city: string, state: string): Observable<Lodging[]> {
    const options =  { params: new HttpParams().set('city', city).set('state', state) } ;
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Lodging[]>(url, options)));
  }

  /**
   * Represents the _Lodging Service_ `post` method
   *
   * @param lodging Lodging
   */
  post(lodging: Lodging): Observable<boolean> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, lodging)));
  }

  /**
   * Represents the _Lodging Service_ `put` method
   *
   * @param lodging Lodging
   */
  put(lodging: Lodging): Observable<Lodging> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.put<Lodging>(url, lodging)));
  }
}
