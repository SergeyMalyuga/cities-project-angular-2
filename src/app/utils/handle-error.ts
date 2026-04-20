import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse): Observable<never> {
  console.error('Auth service error:', error);
  return throwError(() => new Error('Authentication operation failed'));
}
