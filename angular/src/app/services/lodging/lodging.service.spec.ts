import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpRequest } from '@angular/common/http';
import { Hotel } from 'src/app/data/lodging/hotel.model';
import { LodgingService } from './lodging.service';
import { Observable } from 'rxjs';
import { serialize } from 'v8';
import { Config } from './config';
import { RoomType } from 'src/app/data/lodging/room-type.model';
import { Room } from 'src/app/data/lodging/room.model';
import { RoomService } from './room.service';

describe('LodgingService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let lodgingService: LodgingService;
  let config: Config;

  describe('RoomService', () => {
    const roomServiceStub = {
      get() {
        const room: Room = {
          roomId: 1,
          name: ' ',
          type: null,
        };
        return room;
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [LodgingService, Config],
      });

      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      lodgingService = TestBed.inject(LodgingService);
      config = TestBed.inject(Config);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    let roomStub = roomServiceStub.get();
    let roomsStub = [roomStub];

    describe('#getHotels', () => {
      let expectedHotels: Hotel[];

      beforeEach(() => {
        lodgingService = TestBed.inject(LodgingService);
        expectedHotels = [
          { hotelId: 1, description: 'A', type: ' ' },
          { hotelId: 1, description: 'A', type: ' ' },
        ] as Hotel[];
      });

      it('should return expected hotels (called once)', () => {
        lodgingService
          .getHotels()
          .subscribe(
            (hotels) => expect(hotels).toEqual(expectedHotels, 'should return expected hotels'),
            fail
          );

        const req = httpTestingController.expectOne(config.lodging.getHotelUrl);
        expect(req.request.method).toEqual('GET');

        req.flush(expectedHotels);
      });

      it('should be OK returning no hotels', () => {
        lodgingService
          .getHotels()
          .subscribe((hotels) => expect(hotels.length).toEqual(0, 'should have empty array'), fail);

        const req = httpTestingController.expectOne(config.lodging.getHotelUrl);
        req.flush([]);
      });

      it('should return expected hotels (called multiple times)', () => {
        lodgingService.getHotels().subscribe();
        lodgingService.getHotels().subscribe();
        lodgingService
          .getHotels()
          .subscribe(
            (heroes) => expect(heroes).toEqual(expectedHotels, 'should return expected heroes'),
            fail
          );

        const requests = httpTestingController.match(config.lodging.getHotelUrl);
        expect(requests.length).toEqual(3, 'calls to getHotels()');

        // Respond to each request with different mock hotel results
        requests[0].flush([]);
        requests[1].flush([{ hotelID: 1, name: 'A', description: ' ' }]);
        requests[2].flush(expectedHotels);
      });
    });

    describe('#putHotel', () => {
      it('should update a hotel and return it', () => {
        const hotel: Hotel = {
          hotelId: 1,
          description: 'hotel 1',
          type: ' ',
          location: null,
          area: 100,
          reviews: null,
          rooms: roomsStub,
          images: null,
          amenities: null,
        };

        lodgingService
          .putHotel(hotel)
          .subscribe(
            (hotelReturned) => expect(hotelReturned).toEqual(hotel, 'should return the hotel sent'),
            fail
          );

        const req = httpTestingController.expectOne(config.lodging.putHotelUrl);
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(hotel);

        const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: hotel });
        req.event(expectedResponse);
      });
    });

    describe('#postHotel', () => {
      it('should post a new hotel and return it', () => {
        const hotel: Hotel = {
          hotelId: 1,
          description: 'hotel 1',
          type: ' ',
          location: null,
          area: 100,
          reviews: null,
          rooms: null,
          images: null,
          amenities: null,
        };

        lodgingService
          .postHotel(hotel)
          .subscribe(
            (hotelReturned) =>
              expect(hotelReturned).toEqual(hotel, 'should return the hotel added'),
            fail
          );

        const req = httpTestingController.expectOne(config.lodging.postHotelUrl);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(hotel);

        const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: hotel });
        req.event(expectedResponse);
      });
    });

    describe('#deleteHotel', () => {
      it('should request deleteHotel and return hotel deleted', () => {
        const hotel: Hotel = {
          hotelId: 1,
          description: 'hotel 1',
          type: ' ',
          location: null,
          area: 100,
          reviews: null,
          rooms: null,
          images: null,
          amenities: null,
        };

        lodgingService
          .deleteHotel(0)
          .subscribe(
            (hotelReturned) => expect(hotelReturned).toEqual(hotel, 'should return hotel deleted'),
            fail
          );

        const req = httpTestingController.expectOne(config.lodging.deleteHotelUrl + '/0');
        expect(req.request.method).toEqual('DELETE');

        req.flush(hotel);
      });
    });
  });
});
