import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { APIRoute, BASE_URL } from '../constants/const';
import { Credentials } from '../models/credentials';
import { defaultHttpPipe } from '../../utils/rxjs-operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public checkAuthStatus(): Observable<User> {
    return this.http
      .get<User>(`${BASE_URL}/${APIRoute.LOGIN}`)
      .pipe(...defaultHttpPipe<User>());
  }

  public login(credentials: Credentials): Observable<User> {
    return this.http
      .post<User>(`${BASE_URL}/${APIRoute.LOGIN}`, credentials)
      .pipe(...defaultHttpPipe<User>());
  }

  public logout(): Observable<void> {
    return this.http
      .get<void>(`${BASE_URL}/${APIRoute.LOGOUT}`)
      .pipe(...defaultHttpPipe<void>());
  }
}
