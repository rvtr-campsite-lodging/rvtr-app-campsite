import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

describe('AccountService', () => {
  let httpClient: HttpClient;
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService],
    });

    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
