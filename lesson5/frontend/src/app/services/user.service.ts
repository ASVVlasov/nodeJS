import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/users';

  public selectedUser: User;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  saveUser(user: User): Observable<any> {
    return this.http.put(`${this.url}/${user._id}`, user);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`${this.url}/${user._id}`);
  }
}
