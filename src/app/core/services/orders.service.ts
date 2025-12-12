import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../model/orders.model';

export interface OrderQueryParams {
  search?: string;
  customerName?: string;
  status?: string[];
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedOrders {
  data: Order[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly apiUrl = 'http://localhost:4000/orders';

  constructor(private http: HttpClient) {}

  private buildHttpParams(params: OrderQueryParams): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      const value = (params as any)[key];
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => {
            httpParams = httpParams.append(`${key}[]`, v);
          });
        } else {
          httpParams = httpParams.append(key, value);
        }
      }
    });
    return httpParams;
  }

  getOrders(params: OrderQueryParams = {}): Observable<PaginatedOrders> {
    const httpParams = this.buildHttpParams(params);
    return this.http
      .get<{ total: number; page: number; pageSize: number; items: Order[] }>(this.apiUrl, { params: httpParams })
      .pipe(
        map(res => ({ data: res.items, total: res.total }))
      );
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(id: number, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
  }
}
