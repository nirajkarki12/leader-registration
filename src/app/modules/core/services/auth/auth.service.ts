import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  getAuthToken(): string {
    return localStorage.getItem('X-Authorization');
  }

  setAuthToken(authToken) {
    localStorage.setItem('X-Authorization', 'Bearer ' + authToken);
  }

  removeAuthToken() {
    localStorage.removeItem('X-Authorization');
    // sessionStorage.removeItem('X-Authorization');
  }

  isAuthenticated(): boolean {
    const authToken = this.getAuthToken();
    if ( authToken && authToken != null ) {
      return true;
    }
    return false;
  }
}
