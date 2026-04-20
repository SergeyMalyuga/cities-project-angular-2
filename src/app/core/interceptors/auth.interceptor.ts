import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    if (token) {
      const reqClone = req.clone({
        headers: req.headers.set('x-token', token),
      });
      return next.handle(reqClone);
    }
    return next.handle(req);
  }
}
