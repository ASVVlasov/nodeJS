import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  auth() {
    return this.httpClient.get('http://localhost:8080/auth').pipe(
      map(
        (res) => {
          return !((res as any).message);
        }
      )
    );
  }

  login(user: User) {
    return this.httpClient.post('http://localhost:8080/auth/login', user).pipe(
      tap(
        (data) => {
          if (data.hasOwnProperty('token')) {
            this.cookieService.set('localhost=nodejsGB', data['token']);
          }
        },
        (err) => console.log(err)
      )
    );
  }

  register(user: User) {
    return this.httpClient.post('http://localhost:8080/auth/register', user).pipe(
      tap(
        (data: any) => {
          if (data.token) {
            this.cookieService.set('localhost=nodejsGB', data.token);
          }
        },
        (err) => console.log(err)
      )
    )
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
