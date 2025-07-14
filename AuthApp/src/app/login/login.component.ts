import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../CommonService/common.service';
import { AuthService } from '../CommonService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.commonService.login(credentials).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.authService.setUserDetails(response.loginName, response.email);

          this.router.navigateByUrl('/dashboard');
        },
        // error: (err) => {
        //   console.error('Login failed', err);
        //   alert('Invalid user ID or password');
        // }
      });
    } else {
      alert('Please check your inputs');
    }
  }
}
