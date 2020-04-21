import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Location } from 'src/app/data/lodging/location.model';
import { LocationService } from './location.service';
import { Observable } from 'rxjs';
import { serialize } from 'v8';
import { Config } from './config';

describe('LocationService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let locationService: LocationService;
  let config: Config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService, Config],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    locationService = TestBed.inject(LocationService);
    config = TestBed.inject(Config);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getLocation', () => {
    let expectedLocations: Location[];
    beforeEach(() => {
      locationService = TestBed.inject(LocationService);
      expectedLocations = [
        {
          locationId: 1,
          address1: 'street1',
          address2: 'street2',
          city: 'city1',
          state: 'state1',
          zip: 'zip1',
          latitude: 1,
          longitude: 1,
          cultureInfo: 'info1',
        },
        {
          locationId: 2,
          address1: 'street3',
          address2: 'street4',
          city: 'city2',
          state: 'state2',
          zip: 'zip2',
          latitude: 2,
          longitude: 2,
          cultureInfo: 'info2',
        },
      ] as Location[];
    });

    it('should return expected Locations', () => {
      locationService
        .getLocation()
        .subscribe(
          (locations) =>
            expect(locations).toEqual(expectedLocations, 'should return expected Locations'),
          fail
        );

      const req = httpTestingController.expectOne(config.location.getLocationUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedLocations);
    });
  });

  describe('#putLocation', () => {
    it('should update a location and return it', () => {
      const location: Location = {
        locationId: 1,
        address1: '555 Foo Way',
        address2: null,
        city: 'Bar',
        state: 'Tx',
        zip: '000000',
        latitude: null,
        longitude: null,
        cultureInfo: null,
      };

      locationService
        .putLocation(location)
        .subscribe(
          (locationReturned) =>
            expect(locationReturned).toEqual(location, 'should return the location sent'),
          fail
        );

      const req = httpTestingController.expectOne(config.location.putLocationUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(location);

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: location });
      req.event(expectedResponse);
    });
  });

  describe('#postLocation', () => {
    it('should post a new location and return it', () => {
      const location: Location = {
        locationId: 1,
        address1: '555 Foo Way',
        address2: null,
        city: 'Bar',
        state: 'Tx',
        zip: '000000',
        latitude: null,
        longitude: null,
        cultureInfo: null,
      };
      locationService
        .postLocation(location)
        .subscribe(
          (locationReturned) =>
            expect(locationReturned).toEqual(location, 'should return the location added'),
          fail
        );

      const req = httpTestingController.expectOne(config.location.postLocationUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(location);

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: location });
      req.event(expectedResponse);
    });
  });

  describe('#deleteLocation', () => {
    it('should request deleteLocation and return the location deleted', () => {
      const location: Location = {
        locationId: 0,
        address1: '555 Foo Way',
        address2: null,
        city: 'Bar',
        state: 'Tx',
        zip: '000000',
        latitude: null,
        longitude: null,
        cultureInfo: null,
      };
      locationService
        .deleteLocation(0)
        .subscribe(
          (locationReturned) =>
            expect(locationReturned).toEqual(location, 'should return location deleted'),
          fail
        );

      const req = httpTestingController.expectOne(config.location.deleteLocationUrl + '/0');
      expect(req.request.method).toEqual('DELETE');

      req.flush(location);
    });
  });
});
