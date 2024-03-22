import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoFillServiceService {

  private apiUrl = `${environment.baseApiUrl}`;

  constructor(
    private http: HttpClient,
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getClientes(): Observable<any> {
    return this.http.get<any>('https://camposdealer.dev/Sites/TesteAPI/cliente').pipe(
      tap((response: any) => {
        this.sendToApi('clientes', response.length, response);
      })
    );
  }

  getVendas(): Observable<any> {
    return this.http.get<any>('https://camposdealer.dev/Sites/TesteAPI/venda').pipe(
      tap((response: any) => {
        this.sendToApi('vendas', response.length, response);
      })
    );
  }

  getProdutos(): Observable<any> {
    return this.http.get<any>('https://camposdealer.dev/Sites/TesteAPI/produto').pipe(
      tap((response: any) => {
        this.sendToApi('produtos', response.length, response);
      })
    );
  }

  createCliente(data: any) {
    return this.http.post<any>(`${this.apiUrl}/clientes`, data, { headers: this.getHeaders() });
  }

  createProduto(data: any) {
    return this.http.post<any>(`${this.apiUrl}/produtos`, data, { headers: this.getHeaders() });
  }

  createVenda(data: any) {
    return this.http.post<any>(`${this.apiUrl}/vendas`, data, { headers: this.getHeaders() });
  }

  private sendToApi(endpoint: string, count: number, data: any) {
    this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() }).subscribe(
      () => {}
    );
  }

}
