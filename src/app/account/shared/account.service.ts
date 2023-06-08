import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: any) {
    const result = await this.http.post<any>(`${environment.baseApiUrl}api/login`, user).toPromise()
    if (result && result.token) {
      window.localStorage.setItem('token', result.token)
      return true
    }
    return false
  }

  async createAccount(account: any) {
    const result = await this.http.post<any>(`${environment.baseApiUrl}/users`, account).toPromise()
    return result
  }
}
