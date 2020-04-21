import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from 'src/app/data/lodging/room.model';
import { Hotel } from 'src/app/data/lodging/hotel.model';
import { Config } from './config';
import { Observable } from 'rxjs';
import { RoomType } from 'src/app/data/lodging/room-type.model';

@Injectable({
  providedIn: 'root',
})
export class LodgingService {
  constructor(private http: HttpClient, private config: Config) {}

  /**
   * Returns all the hotels from lodging api.
   *
   * @returns Observable array of Hotels
   */
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.config.lodging.getHotelUrl);
  }

  /**
   * Sends Hotel to lodging api to be added.
   *
   * @param hotel Hotel
   * @returns hotel that was added
   */
  postHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.config.lodging.postHotelUrl, hotel);
  }

  /**
   * Sends Hotel to lodging api to be updated.
   *
   * @param hotel Hotel
   * @returns hotel that was updated
   */
  putHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(this.config.lodging.putHotelUrl, hotel);
  }

  /**
   * Delete hotel from lodging api.
   *
   * @param id number
   * @returns hotel that was deleted
   */
  deleteHotel(id: number): Observable<Hotel> {
    const url = `${this.config.lodging.deleteHotelUrl}/${id}`;

    return this.http.delete<Hotel>(url);
  }
}
