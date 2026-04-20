import {
  catchError,
  MonoTypeOperatorFunction,
  retry,
  throwError,
  timeout,
  timer,
} from 'rxjs';
import { RETRY_ATTEMPTS, TIMEOUT_MS } from '../core/constants/const';
import { handleError } from './handle-error';
import { HttpErrorResponse } from '@angular/common/http';

export function defaultHttpPipe<T>(): [
  MonoTypeOperatorFunction<T>,
  MonoTypeOperatorFunction<T>,
  MonoTypeOperatorFunction<T>,
] {
  return [
    timeout(TIMEOUT_MS),
    retry({
      count: RETRY_ATTEMPTS,
      delay: (error: HttpErrorResponse) => {
        if (error.status === 0 || error.status >= 500) {
          return timer(1500);
        }
        return throwError(() => error);
      },
    }),
    catchError(handleError),
  ];
}
