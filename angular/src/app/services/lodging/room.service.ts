import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Observable } from 'rxjs';
import { Room } from '../../data/lodging/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(readonly http: HttpClient, readonly config: Config) {}

  /**
   * Returns all the rooms from lodging api.
   *
   * @returns Observable array of Rooms
   */
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.config.room.getRoomUrl);
  }

  /**
   * Sends Room to lodging api to be added.
   *
   * @param room Room
   * @returns Room that was added
   */
  postRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.config.room.postRoomUrl, room);
  }

  /**
   * Sends Room to lodging api to be updated.
   *
   * @param room Room
   * @returns room that was updated
   */
  putRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(this.config.room.putRoomUrl, room);
  }

  /**
   * Delete Room from lodging api.
   *
   * @param roomId number
   * @returns room that was deleted
   */
  deleteRoom(roomId: number): Observable<Room> {
    const url = `${this.config.room.deleteRoomUrl}/${roomId}`;
    return this.http.delete<Room>(url);
  }
}
