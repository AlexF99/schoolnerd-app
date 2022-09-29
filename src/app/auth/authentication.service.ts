import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(credentials: LoginContext): Observable<any> {
    const data = {
      email: credentials.username,
      password: credentials.password,
    };

    return this.http.post('/auth/login', data, { observe: 'response' }).pipe(
      map((resp: any) => {
        const response = {
          username: resp.body.user.email,
          token: resp.body.tokens || null,
          status: resp.body.status || null,
          message: resp.body.message || null,
        };

        if (!response.status && !response.message) {
          this.credentialsService.setCredentials(response);
          return resp.body.user;
        } else {
          return resp.body.status;
        }
      }).bind(this)
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
