import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7183/api/User';
  private custBaseUrl : string = 'https://localhost:7183/api/Customer';
  private devBaseUrl : string = 'https://localhost:7183/api/Device';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }

  getCustomers(){
    return this.http.get<any>(this.custBaseUrl);
  }

  getDevices(){
    return this.http.get<any>(this.devBaseUrl);
  }

  // getCustomers(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/customers`);
  // }

  getDevicesById(custId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.devBaseUrl}/${custId}`);
  }
}
