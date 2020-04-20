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
import { asyncScheduler, scheduled } from 'rxjs';

describe('AccountService', () => {
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

  it('should make delete() request', fakeAsync(() => {
    let req: TestRequest;

    service.delete('0').subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test?id=0');
    req.flush(JSON.stringify(true));
  }));

  it('should make get() request', fakeAsync(() => {
    const actual: Account[] = [];
    let req: TestRequest;

    service.get().subscribe((res) => {
      expect(res.length).toEqual(actual.length);
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(actual);
  }));
});
