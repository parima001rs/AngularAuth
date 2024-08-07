import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl:string = "https://localhost:7183/api/User/";
  private baseUrl: string = `${environment.baseUrl}/api/User/`;
  private userPayload: any;
  constructor(private http : HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
    // console.log(this.userPayload);
  }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  //setting token
  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken',tokenValue)
  }

  //getting token
  getToken(){
    return localStorage.getItem('token')
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  //it will return the payload
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!; //non-null assertion operator
    // console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload)
      return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }

  getUserIdFromToken(){
    if(this.userPayload)
      return this.userPayload.nameid;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
}
