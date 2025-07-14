import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBaseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(credentials: { loginName: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserDetails(): { loginName: string | null; email: string | null } {
    return {
      loginName: localStorage.getItem('loginName'),
      email: localStorage.getItem('email')
    };
  }


  setUserDetails(loginName: string, email: string): void {
    localStorage.setItem('loginName', loginName);
    localStorage.setItem('email', email);
  }

  logout(): void {
    localStorage.clear();

    localStorage.removeItem('token');
    localStorage.removeItem('loginName');
    localStorage.removeItem('email');


  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
