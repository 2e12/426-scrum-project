import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import User from '../models/user';

export default class BaseService {
  protected ROOT_URL = environment.rootUrl + 'api/';

  getHttpHeaders(user: User) {
    return { headers: new HttpHeaders({
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
        'Access-Control-Allow-Origin': 'application/json',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Origin, Accept',
        Authorization: 'Basic ' + btoa(user.username + ':' + user.password)
      }) };
  }
}
