import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  login(param: any) {
    const url = '/auth/login';
    return this.http.post(url, param);
  }
  get() {
    // return this.http.get<Account>(SERVER_API_URL + 'uaa/api/account', { observe: 'response' });
    return this.http.get('/uaa/api/account', { observe: 'response' });
  }
}
