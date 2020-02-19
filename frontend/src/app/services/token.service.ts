import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  token: string;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.cookieService.get('localhost=nodejsGB'))
    });

    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event.body.message);
            console.log('Server response');
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('Unauthorized');
            }
          }
        }
      )
    );
  };

}
