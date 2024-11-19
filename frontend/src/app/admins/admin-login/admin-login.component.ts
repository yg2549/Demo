import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way binding
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  
  onLogin(): void {
    const loginData = { username: this.username, password: this.password };
    this.http
      .post<any>('http://localhost:5001/api/admin-login', loginData)
      .subscribe(
        (response) => {
          if (response.success) {
            // Redirect to dashboard or home on successful login
            this.authService.setSelectedSite(response.site);
            this.router.navigate(['/admins/dashboard/table']);
          } else {
            alert('Login failed');
          }
        },
        (error) => {
          console.error('Error during login:', error);
          alert('Login failed');
        }
      );
  }

  // onLogin() {
  //   let loading = true;
  //   const isAuthenticated = this.authService.login(this.username, this.password);
  //   loading = false;
  //   if(!loading){
  //     console.log(isAuthenticated);
  //     if (isAuthenticated) {
  //       this.router.navigate(['/admins/dashboard/table']); // Navigate to the dashboard after login
  //     } else {
  //       alert('Invalid credentials or site not selected');
  //     }
  //   }
  // }
}

