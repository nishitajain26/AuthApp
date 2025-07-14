import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 

})
export class AppComponent {
  // goToLogin() {
  // this.route.navigate(['/login']);
  // }
  // goToSignup() {
  // this.route.navigate(['/signup']);
  // }

  title = 'AuthApp';
  constructor(private http: HttpClient, private route: Router) {

  }
  goToLogin() {
    this.route.navigate(['/login']);
  }
  goToSignup() {
    this.route.navigate(['/signup']);
  }
}
