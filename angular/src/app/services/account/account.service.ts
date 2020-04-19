import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accountApi: string;

  /**
   * Represents the _Account Service_ `constructor` method
   *
   * @param config
   * @param http
   */
  constructor(private config: ConfigService, private http: HttpClient) {
    config.get().subscribe((cfg) => (this.accountApi = cfg['accountApi']));
  }

  /**
   * Represents the _Account Service_ `delete` method
   *
   * @param id
   */
  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.accountApi, { params: { id: id } });
  }

  /**
   * Represents the _Account Service_ `get` method
   */
  get(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountApi);
  }

  /**
   * Represents the _Account Service_ `getOne` method
   *
   * @param id
   */
  getOne(id: string): Observable<Account> {
    return this.http.get<Account>(this.accountApi, { params: { id: id } });
  }

  /**
   * Represents the _Account Service_ `post` method
   *
   * @param account
   */
  post(account: Account): Observable<boolean> {
    return this.http.post<boolean>(this.accountApi, account);
  }

  /**
   * Represents the _Account Service_ `put` method
   *
   * @param account
   */
  put(account: Account): Observable<Account> {
    return this.http.put<Account>(this.accountApi, account);
  }
}
