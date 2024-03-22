import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendaServiceService {

  private apiUrl = `${environment.baseApiUrl}/vendas`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getVendas() {
    return this.http.get<any>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  createVenda(data: any) {
    return this.http.post<any>(`${this.apiUrl}`, data, { headers: this.getHeaders() });
  }

  editVenda(data: any) {
    return this.http.put<any>(`${this.apiUrl}/${data.idVenda}`, data, { headers: this.getHeaders() });
  }

  deleteVenda(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
