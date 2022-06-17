import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, finalize, Observable, retry, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../auth.service";
import {TokenstorageService} from "../tokenstorage.service";
import {NgToastService} from "ng-angular-popup";
import {LoginComponent} from "../../auth/login/login.component";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector:Injector,private toast:NgToastService) {}
  authService=this.injector.get(AuthService)
  tokenService=this.injector.get(TokenstorageService)

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);



  addTokenHeader(request:HttpRequest<any>,token:any){
    return request.clone({
      setHeaders:{
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization':`Bearer ${token}`
      }
    });
  }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      //alert(`HTTP Error,${this.addTokenHeader(req,token).url}`)
      /*if (error instanceof HttpErrorResponse && error.url=="http://localhost:8080/login") {

        this.toast.error({detail:"Login",summary:'Email ou Mot de Passe Incorrecte',duration:2000});
        this.authService.spining=false
        return this.handle401Error(authReq, next);
      }*/
      return throwError(error);
    })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.getRefreshToken();
      if (token)
        return this.authService.GenerateRefreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.tokenService.saveToken(token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.tokenService.signOut();
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  /*private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      console.log("refreeeesh:    " + this.refreshTokenSubject);
      console.log(window.sessionStorage.getItem('auth-refreshtoken'));

      const token = this.authService.getRefreshToken();

      console.log(token);

      if (token)
        return this.authService.GenerateRefreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.authService.storeTokens(token.data);
            this.refreshTokenSubject.next(token.data.accessToken);

            return next.handle(this.addTokenHeader(request, token.data.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;


            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("-----intercept----")
    let authReq = req;
    const token = this.authService.getAccessToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
      console.log("token added")
      return next.handle(authReq).pipe(catchError(err => {
        if(err instanceof HttpErrorResponse && !authReq.url.includes('auth/login') && err.status === 401){
          return this.handle401Error(authReq, next);
        }
        return throwError(err)

      }));
    }
    else{
      return next.handle(req)
    }



  }*/




}
