import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Config } from './config';
import { Room } from 'src/app/data/lodging/room.model';
import { RoomType } from 'src/app/data/lodging/room-type.model';
import { RoomService } from './room.service';

describe('RoomService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let roomService: RoomService;
  let config: Config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomService, Config],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    roomService = TestBed.inject(RoomService);
    config = TestBed.inject(Config);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // GET TEST
  describe('#getRooms', () => {
    let expectedRooms: Room[];

    beforeEach(() => {
      roomService = TestBed.inject(RoomService);
      expectedRooms = [
        { roomId: 1, name: 'room 1', type: new RoomType() },
        { roomId: 2, name: 'room 2', type: new RoomType() },
      ] as Room[];
    });

    it('should return expected rooms', () => {
      roomService
        .getRooms()
        .subscribe(
          (rooms) => expect(rooms).toEqual(expectedRooms, 'should return expected rooms'),
          fail
        );

      const req = httpTestingController.expectOne(config.room.getRoomUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedRooms);
    });
  });

  // PUT TEST
  describe('#putRoom', () => {
    it('should update a room and return it', () => {
      const room: Room = { roomId: 1, name: 'new room 1', type: null };

      roomService
        .putRoom(room)
        .subscribe(
          (roomReturned) => expect(roomReturned).toEqual(room, 'should return the room sent'),
          fail
        );

      const req = httpTestingController.expectOne(config.room.putRoomUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(room);

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: room });
      req.event(expectedResponse);
    });
  });

  // POST TEST
  describe('#postRoom', () => {
    it('should post a new room and return it', () => {
      const room: Room = { roomId: 3, name: 'room 3', type: null };

      roomService
        .postRoom(room)
        .subscribe(
          (roomReturned) => expect(roomReturned).toEqual(room, 'should return the room added'),
          fail
        );

      const req = httpTestingController.expectOne(config.room.postRoomUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(room);

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: room });
      req.event(expectedResponse);
    });
  });

  // DELETE TEST
  describe('#deleteRoom', () => {
    it('should delete a room', () => {
      const room: Room = { roomId: 0, name: 'room 1', type: null };

      roomService.deleteRoom(0).subscribe((data: any) => {
        expect(data).toBe(room);
      });

      const req = httpTestingController.expectOne(config.room.deleteRoomUrl + '/0');
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: room });
      req.event(expectedResponse);
    });
  });
});
