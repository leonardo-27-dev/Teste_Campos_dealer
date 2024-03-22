import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = `${environment.baseApiUrl}/auth`

  constructor(private http: HttpClient) { }

  createUser(name: any, email: any, password: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password });
  }

  login(email: any, password: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

}
