import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormGroup} from '@angular/forms';
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ROOT_URL = environment.rootUrl + 'api/users/';
  private user;
  private password;

  constructor(private http: HttpClient) { }

  authenticateUser(loginFormGroup: FormGroup) {
    this.password = loginFormGroup.get('password').value;
    localStorage.setItem('password', JSON.stringify(this.password));
    return this.http.get<{id, username, email}>(this.ROOT_URL + 'me', {headers: this.createHeaders(
        loginFormGroup.get('username').value,
        loginFormGroup.get('password').value
      )
    });
  }

  isUserAuthenticated() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.password = JSON.parse(localStorage.getItem('password'));
    return !!this.user;
  }

  private createHeaders(username, password): HttpHeaders {
    return new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(username + ':' + password))
        .set('Access-Control-Allow-Origin', 'http://localhost:8100')
        .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
        .set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Origin, Accept');
  }

  setUser(data: { id; username; email }) {
    localStorage.setItem('user', JSON.stringify(data));
    this.user = data;
  }
}
