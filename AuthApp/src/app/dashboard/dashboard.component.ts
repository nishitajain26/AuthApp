import { Component, OnInit } from '@angular/core';
import { CommonService } from '../CommonService/common.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validator, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../CommonService/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardForm!: FormGroup;

  userProfile = {
    name: '',
    email: '',
  };


  constructor(private commonService : CommonService, private router: Router, private authService :AuthService ,private http: HttpClient) { }

  ngOnInit(): void {
    // const data = this.dashboardForm.value;
   if(!this.authService.isLoggedIn()){
    this.router.navigate(['/login']);
   }
   this.commonService.getDashboardData().subscribe({
    next:(data)=> {
    this.userProfile = data.userProfile;
    },
    error :(err)=>{
      console.log('Failed to show dashboad' , err);
      alert('no authorised user is found');
    }
    
   })
  }
  
  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }

  logout() {
  this.authService.logout();
  this.router.navigateByUrl('/login');
}


}
