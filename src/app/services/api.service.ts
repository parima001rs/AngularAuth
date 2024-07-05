import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private baseUrl: string = 'https://localhost:7183/api/User';
  private baseUrl: string = `${environment.baseUrl}/api/User`;
  private custBaseUrl : string = `${environment.baseUrl}/api/Customer`;
  private devBaseUrl : string = `${environment.baseUrl}/api/Device`;


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

  getDevicesById(custId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.devBaseUrl}/${custId}`);
  }

  createCustomer(custObj: any){
    return this.http.post<any>(`${this.custBaseUrl}/createCustomer`,custObj)
  }

  updateCustomer(customerId: string, updatePayload: any): Observable<any> {
    return this.http.put<any>(`${this.custBaseUrl}/updateCustomer/${customerId}`, updatePayload);
  }

  deleteCustomer(customerId: string, deletePayload: any): Observable<any> {
    return this.http.put<any>(`${this.custBaseUrl}/deleteCustomer/${customerId}`, deletePayload);
  }

  registerDevice(device: any): Observable<any> {
    return this.http.post<any>(`${this.devBaseUrl}/registerDevice`,device);
  }

  updateDevice(deviceId: string, updatePayload: any): Observable<any> {
    return this.http.put<any>(`${this.devBaseUrl}/updateDevice/${deviceId}`, updatePayload);
  }

  deleteDevice(deviceId: string, deletePayload: any): Observable<any> {
    return this.http.put<any>(`${this.devBaseUrl}/deleteDevice/${deviceId}`, deletePayload);

  

  
  
}


  
}
