import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authenticationService
                .logout()
                .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
            }
          }
        }
      )
    );
  }
}
