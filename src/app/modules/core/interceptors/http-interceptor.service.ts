import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import { AppRoutes } from 'src/app/constants/app-routes';
import { AuthService } from 'src/app/modules/core/services/auth/auth.service';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  clonedRequest: HttpRequest<any>;

  constructor(
    private router: Router,
    private injector: Injector,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ValidatorMessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(AuthService);
    this.clonedRequest = request.clone({
      setHeaders: { Authorization: `${this.authService.getAuthToken()}` }
    });
    return next.handle(this.clonedRequest)
    .do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            // console.log('new header:' + JSON.stringify(event.headers.get('X-Authorization')));
            if (event.headers.get('X-Authorization')) {
              this.authService.setAuthToken(event.headers.get('X-Authorization'));
            }
        } else {
          // this.authService.removeAuthToken();
        }
      },
      (errorResponse: any) => {
        if (errorResponse instanceof HttpErrorResponse) {
          if (errorResponse.status) {
            switch (errorResponse.status) {
              case 401:
              if (errorResponse.error.message === 'Authorization Token not found') {
                // console.log('Authorization Token not found');
                this.toastr.showMessage('Session Time out', 'error');
                this.router.navigate([AppRoutes.login]);
              }
              break;
              case 408:
                if (errorResponse.error.message === 'Token is Expired') {
                  // console.log('Token is Expired');
                  this.toastr.showMessage('Session Time out', 'error');
                  this.router.navigate([AppRoutes.login]);
                }
                break;
                case 405:
                if (errorResponse.error.message === 'Token is Invalid') {
                  console.log('Token is Invalid');
                  this.toastr.showMessage('Session Time out, Unauthorized Access', 'error');
                  this.router.navigate([AppRoutes.login]);
                }
                break;
              case 404:
                // add navigation code
                // this.router.navigate([AppRoutes.notFound], {skipLocationChange: true});
                break;

            }
          } else {
            this.authService.removeAuthToken();
            console.log('Connection failed');
            this.router.navigate([AppRoutes.serverError], {skipLocationChange: true});
          }
        }
      }
    )
  }
}
