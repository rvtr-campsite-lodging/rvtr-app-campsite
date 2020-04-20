import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { Account } from 'src/app/data/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  api: string;

  /**
   * Represents the _Account Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private config: ConfigService, private http: HttpClient) {
    config.get().subscribe((cfg) => (this.api = cfg.api.account));
  }

  /**
   * Represents the _Account Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.api, { params: { id } });
  }

  /**
   * Represents the _Account Service_ `get` method
   */
  get(): Observable<Account[]> {
    return this.http.get<Account[]>(this.api);
  }

  /**
   * Represents the _Account Service_ `getOne` method
   *
   * @param id string
   */
  getOne(id: string): Observable<Account> {
    return this.http.get<Account>(this.api, { params: { id } });
  }

  /**
   * Represents the _Account Service_ `post` method
   *
   * @param account Account
   */
  post(account: Account): Observable<boolean> {
    return this.http.post<boolean>(this.api, account);
  }

  /**
   * Represents the _Account Service_ `put` method
   *
   * @param account Account
   */
  put(account: Account): Observable<Account> {
    return this.http.put<Account>(this.api, account);
  }
}
