import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './core/error/error.service';
import { USER_ACCESS_TOKEN } from './shared/constants';

const {appUrl} = environment

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorService: ErrorService) {

  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('>>>>>>INTERCEPTOPR', req.url);

    if (req.url.startsWith('/server')) {
      console.log('>>replacing server url with',appUrl );
      console.log(req.url.replace('/server', appUrl));
      req = req.clone({
        url: req.url.replace('/server', appUrl),
        withCredentials: true,
    });
      
    }
    const token = localStorage.getItem(USER_ACCESS_TOKEN);

    if (token) {
      console.log('>>adding token to request');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((err) => {
        
        if (err.status === 401) {
          this.router.navigate(['/users/login']);
          
        } else {
          this.errorService.setError(err);
        this.router.navigate(['/error']);

        }

        return [err]
      })
    )
  }
}

export const appInterceptProvider: Provider = {
  multi: true,
  useClass: AppInterceptor,
  provide: HTTP_INTERCEPTORS,
};
