import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { Config } from '../../data/config.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ConfigService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Config],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should support have a get() method', () => {
    const expected: Config = {
      api: {
        account: null,
        booking: null,
        lodging: null,
      },
    };

    let req: TestRequest;

    service.get().subscribe((res) => {
      expect(res).toBe(expected);
    });

    req = httpTestingController.expectOne('assets/config.json');

    req.flush(expected);
  });
});
