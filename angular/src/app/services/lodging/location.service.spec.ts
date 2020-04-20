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
          LocationId: 1,
          Address1: 'street1',
          Address2: 'street2',
          City: 'city1',
          State: 'state1',
          Zip: 'zip1',
          Latitude: 1,
          Longitude: 1,
          CultureInfo: 'info1',
        },
        {
          LocationId: 2,
          Address1: 'street3',
          Address2: 'street4',
          City: 'city2',
          State: 'state2',
          Zip: 'zip2',
          Latitude: 2,
          Longitude: 2,
          CultureInfo: 'info2',
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
        LocationId: 1,
        Address1: '555 Foo Way',
        Address2: null,
        City: 'Bar',
        State: 'Tx',
        Zip: '000000',
        Latitude: null,
        Longitude: null,
        CultureInfo: null,
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
        LocationId: 1,
        Address1: '555 Foo Way',
        Address2: null,
        City: 'Bar',
        State: 'Tx',
        Zip: '000000',
        Latitude: null,
        Longitude: null,
        CultureInfo: null,
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
        LocationId: 0,
        Address1: '555 Foo Way',
        Address2: null,
        City: 'Bar',
        State: 'Tx',
        Zip: '000000',
        Latitude: null,
        Longitude: null,
        CultureInfo: null,
      };
      locationService
        .deleteLocation(0)
        .subscribe(
          (locationReturned) =>
            expect(locationReturned).toEqual(location, 'should return location deleted'),
          fail
        );

      const req = httpTestingController.expectOne(config.location.deleteLocationUrl+'/0');
      expect(req.request.method).toEqual('DELETE');

      req.flush(location);
    });
  });
});
