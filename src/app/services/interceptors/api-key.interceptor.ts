import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ENVIRONMENT } from '../tokens/environment.token';

export function apiKeyInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const modifiedReq = req.clone({
    setParams: {
      api_key: inject(ENVIRONMENT).apiKey,
    },
  });

  return next(modifiedReq);
}
