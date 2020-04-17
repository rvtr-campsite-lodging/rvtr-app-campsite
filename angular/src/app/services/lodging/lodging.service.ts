import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from "src/app/data/lodging/location.model";
import { Review } from "src/app/data/lodging/review.model";
import { Image } from "src/app/data/lodging/image.model";
import { Amenity } from "src/app/data/lodging/amenity.model";
import { Room } from "src/app/data/lodging/room.model";
import { Hotel } from 'src/app/data/lodging/hotel.model';
import { Config } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LodgingService {

  constructor(private http: HttpClient, private config: Config) { }
  
  get(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.config.lodging.getHotelUrl);
  }
  
}
