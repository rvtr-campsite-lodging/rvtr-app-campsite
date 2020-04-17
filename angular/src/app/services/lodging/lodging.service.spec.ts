import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Hotel } from 'src/app/data/lodging/hotel.model';
import { LodgingService } from './lodging.service';
import { Observable } from 'rxjs';
import { serialize } from 'v8';
import { Config } from './config'

describe('LodgingService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: LodgingService;
  let config: Config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LodgingService,
        Config
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LodgingService);
    config = TestBed.inject(Config);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#getHotels', () => {
    let expectedHotels: Hotel[];

    beforeEach(() => {
      service = TestBed.inject(LodgingService);
      expectedHotels = [
        { hotelID: 1, name: 'A', description: ' ' },
        { hotelID: 1, name: 'A', description: ' ' }
      ] as Hotel[];
    });

    it('should return expected hotels', () => {
      service.get().subscribe(
        hotels => expect(hotels).toEqual(expectedHotels, 'should return expected hotels'),
        fail
      );

      const req = httpTestingController.expectOne(config.lodging.getHotelUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHotels);
    });

    it('should return expected hotels', () => {
      service.get().subscribe(
        hotels => expect(hotels.length).toBe(2),
        fail
      );

      const req = httpTestingController.expectOne(config.lodging.getHotelUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHotels);
    });
  });
});