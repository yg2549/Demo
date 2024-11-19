import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for common directives like ngIf, ngFor
import { FormsModule } from '@angular/forms';  // Import FormsModule for two-way binding

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  standalone: true,  // Mark the component as standalone
  imports: [CommonModule, FormsModule],  // Explicitly import the required modules
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  selectedFacility: string = '';
  facilities: string[] = ['Chavat Marpe'];

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const loginData = { username: this.username, password: this.password };
    this.http
      .post<any>('http://localhost:5001/api/admin-login', loginData)
      .subscribe(
        (response) => {
          if (response.success) {
            // Redirect to dashboard or home on successful login
            this.router.navigate(['/table']);
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
}
