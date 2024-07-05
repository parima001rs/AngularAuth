// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, catchError, switchMap, throwError } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { TokenApiModel } from '../models/token-api.model';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(private auth: AuthService, private router: Router) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const myToken = this.auth.getToken();

//     if(myToken){
//       request = request.clone({
//         setHeaders: {Authorization: `Bearer ${myToken}`}
//       })
//     }

//     return next.handle(request).pipe(
//       catchError((err: any) => {
//         if(err instanceof HttpErrorResponse){
//           if(err.status === 401){
//             alert("Token is expired, login again");
//             //this.toast.warning({detail:"Warning", summary:"Token is expired, login again"});
//             //this.router.navigate(['login'])
//             //handle request
//             return this.handleUnAuthorizedError(request, next);
//           }
//         }
//         return throwError(() => new Error("Some other error occured"))
//       })
//     );
//   }

//   handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
//     let tokenApiModel = new TokenApiModel();
//     tokenApiModel.accessToken = this.auth.getToken()!;
//     tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
//     return this.auth.renewToken(tokenApiModel)
//     .pipe(
//       switchMap((data:TokenApiModel)=>{
//         this.auth.storeRefreshToken(data.refreshToken);
//         this.auth.storeToken(data.accessToken);
//         req = req.clone({
//           setHeaders: {Authorization: `Bearer ${data.accessToken}`}
//         })
//         return next.handle(req);
//       }),
//       catchError((err)=>{
//         return throwError(()=>{
//           alert("Token is expired, login again");
//           //this.toast.warning({detail:"Warning", summary:"Token is expired, login again"});
//           this.router.navigate(['login'])
//         })
//       })
//     )
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
 
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
 
  constructor(private auth: AuthService, private router: Router) {}
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this.auth.getToken();
 
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }
 
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorizedError(request, next);
        }
        return throwError(error); // Propagate other errors
      })
    );
  }
 
  private handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const refreshToken = this.auth.getRefreshToken();
    const accessToken = this.auth.getToken();
 
    if (!refreshToken) {
      this.router.navigate(['login']);
      return throwError('No refresh token available');
    }
 
    return this.auth.renewToken({
      refreshToken,
      accessToken,
    }).pipe(
      switchMap((data: TokenApiModel) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
 
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }
        });
 
        return next.handle(req);
      }),
      catchError((err) => {
        this.router.navigate(['login']);
        return throwError(err);
      })
    );
  }
}