import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiBaseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  signupUser(userData: { name: string, email: string, phoneNumber: number, password: string, confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/signupUser`, userData);
  }
  login(credentials: { loginName: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/login`, credentials);
  }
  getDashboardData(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiBaseUrl}/getDashboardData`, { headers });

  }
}

