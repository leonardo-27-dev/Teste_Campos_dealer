import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoServiceService {

  private apiUrl = `${environment.baseApiUrl}/produtos`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProdutos() {
    return this.http.get<any>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  createProduto(data: any) {
    return this.http.post<any>(`${this.apiUrl}`, data, { headers: this.getHeaders() });
  }

  editProduto(data: any) {
    return this.http.put<any>(`${this.apiUrl}/${data.idProduto}`, data, { headers: this.getHeaders() });
  }

  deleteProduto(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
