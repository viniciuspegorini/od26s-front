import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    if (token && !req.headers.has('Authorization')) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(authReq)
        .pipe(
          tap(() => {
            },
            err => {
              if (err.status === 401) {
                this.router.navigate(['/login']);
              }
            }
          ));
    }
    return next.handle(req)
      .pipe(
        tap(() => {
          },
          err => {
            if (err.status === 401) {
              this.router.navigate(['/login']);
            }
          }
        ));
  }
}
