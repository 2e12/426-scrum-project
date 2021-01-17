import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import BaseService from './base-service';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private user: User = new User();

  constructor(private http: HttpClient) {
    super();
  }

  authenticateUser(user: User) {
    return this.http.get<User>(this.ROOT_URL + 'users/me', this.getHttpHeaders(user));
  }

  isUserLoggedIn() {
    if (localStorage.getItem('user') === null) {
      return false;
    }
    this.user = JSON.parse(atob(localStorage.getItem('user')));
    return !!this.user;
  }

  setUser(user: User) {
    this.user.email = user.email;
    this.user.id = user.id;
    localStorage.setItem('user', btoa(JSON.stringify(this.user)));
  }

  getUser(): User {
    return this.user;
  }

  newUser(username: string, password: string) {
    this.user.username = username;
    this.user.password = password;
    return this.user;
  }

  registerUser(user: User) {
    return this.http.post<User>(this.ROOT_URL + 'users/me', {
      username: user.username,
      email: user.email,
      password: user.password
    }, this.getHttpHeaders(user));
  }
}
