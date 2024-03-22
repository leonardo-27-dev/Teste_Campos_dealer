import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  private apiUrl = `${environment.baseApiUrl}/clientes`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCliente() {
    return this.http.get<any>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  createCliente(data: any) {
    return this.http.post<any>(`${this.apiUrl}`, data, { headers: this.getHeaders() });
  }

  editCliente(data: any) {
    return this.http.put<any>(`${this.apiUrl}/${data.idCliente}`, data, { headers: this.getHeaders() });
  }

  deleteCliente(id: number) {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.getHeaders();

    return this.http.delete<any>(url, { headers });
  }

}
