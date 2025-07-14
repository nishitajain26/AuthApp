import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, AbstractControl, Validator, ValidatorFn, Validators } from '@angular/forms';
import { CommonService } from '../CommonService/common.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  constructor(private http: HttpClient, private fb: FormBuilder, private commonService : CommonService ,private router: Router) { }
  // userData : any;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator: ValidatorFn = (form: AbstractControl): { [key: string]: any } | null => {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null;
};


  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.commonService.signupUser(userData).subscribe({
        next: (res: any) => {
          alert('signup succesful');
          this.router.navigateByUrl('/login');
        },
        // error: (err: any) => {
        //   console.log('signup failed', err);
        //   alert('please try again');
        // }
      })

    }
    else {
      this.signupForm.markAllAsTouched()
      // alert('signup is failed');
    }
  }
}
