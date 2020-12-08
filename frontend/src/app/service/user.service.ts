import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user;
  private ROOT_URL = environment.rootUrl + "api/users/"

  constructor(private http: HttpClient) { }

  authenticateUser(loginFormGroup: FormGroup) {
    return this.http.get<{id, username, email}>(this.ROOT_URL + "me", {headers: this.createHeaders(
        loginFormGroup.get('username').value,
        loginFormGroup.get('password').value
      )
    });
  }

  isUserAuthenticated() {
    return !!this.user;
  }

  private createHeaders(username, password): HttpHeaders {
    return new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(username + ":" + password))
        .set("Access-Control-Allow-Origin", "http://localhost:8100")
        .set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Origin, Accept");
  }

  setUser(data: { id; username; email }) {
    this.user = data;
  }
}
