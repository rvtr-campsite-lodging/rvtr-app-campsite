import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AccountService } from './account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Config } from 'src/app/data/config.model';
import { Account } from 'src/app/data/account.model';
import { asyncScheduler, scheduled } from 'rxjs';

describe('AccountService', () => {
  const accountMock: Account[] = [
    {
      id: '0',
      address: null,
      name: '',
      payments: null,
      profiles: null,
    },
  ];

  const configServiceStub = {
    get() {
      const config: Config = {
        api: {
          account: 'test',
          booking: null,
          lodging: null,
        },
      };

      return scheduled([config], asyncScheduler);
    },
  };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountService);
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
      expect(res.length).toEqual(accountMock.length);
    });

    service.get('0').subscribe((res) => {
      expect(res[0]).toEqual(accountMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    reqOne = httpTestingController.expectOne('test?id=0');

    req.flush(accountMock);
    reqOne.flush(accountMock);
  }));

  it('should make httpPost request', fakeAsync(() => {
    let req: TestRequest;

    service.post(accountMock[0]).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpPut request', fakeAsync(() => {
    let req: TestRequest;

    service.put(accountMock[0]).subscribe((res) => {
      expect(res).toEqual(accountMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(accountMock[0]);
  }));
});
