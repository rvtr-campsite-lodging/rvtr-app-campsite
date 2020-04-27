import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { Config } from '../../data/config.model';
import { RentalUnit } from '../../data/rental-unit.model';
import { RentalUnitService } from './rental-unit.service';

describe('Rental-UnitService', () => {
  const rentalMock: RentalUnit[] = [
    {
      id: '0',
      bathrooms: null,
      bedrooms: null,
      name: null,
      occupancy: null,
      type: null
    },
  ];

  const configServiceStub = {
    get() {
      const config: Config = {
        api: {
          account: null,
          booking: null,
          lodging: null,
          review: null,
          rentalUnit: 'test',
          rental: null
        },
        navigation: null,
      };

      return scheduled([config], asyncScheduler);
    },
  };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: RentalUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RentalUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make httpDelete request', fakeAsync(() => {
    let req: TestRequest;

    service.delete('0').subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test?id=0');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpGet request', fakeAsync(() => {
    let req: TestRequest;
    let reqOne: TestRequest;

    service.get().subscribe((res) => {
      expect(res.length).toEqual(rentalMock.length);
    });

    service.get('0').subscribe((res) => {
      expect(res[0]).toEqual(rentalMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    reqOne = httpTestingController.expectOne('test?id=0');

    req.flush(rentalMock);
    reqOne.flush(rentalMock);
  }));

  it('should make httpPost request', fakeAsync(() => {
    let req: TestRequest;

    service.post(rentalMock[0]).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpPut request', fakeAsync(() => {
    let req: TestRequest;

    service.put(rentalMock[0]).subscribe((res) => {
      expect(res).toEqual(rentalMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(rentalMock[0]);
  }));
});
