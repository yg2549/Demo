import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'selectedSite';
  private isAuthenticated = false;
  private apiUrl = 'http://localhost:5001/api/admin-login';

  constructor(private router: Router, private http: HttpClient) {}
  setSelectedSite(site: number): string {
    localStorage.setItem(this.storageKey, site+"");
    return this.getselectedSite() || "fail";
  }
  // Store site in localStorage after successful login
  // login(username: string, password: string): boolean {
    // Simulate authentication (you can integrate with a real backend here)
    // let loading = true;
    // const login_data = {
    //   "username": username,
    //   "password": password
    // }
    // this.http.post<any>(this.apiUrl, login_data).subscribe(
    //   (response) => {
    //     if (response.success) {
    //       // Redirect to dashboard or home on successful login
    //       localStorage.setItem(this.storageKey, "place");
    //       this.isAuthenticated = true;
    //     }
    //     else{
    //       this.isAuthenticated = false;
    //     }
    //   }
    // )
    // return this.isAuthenticated;
  // }

  // Get the selected site from localStorage
  getselectedSite(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  // Logout and clear session data
  logout(): void {
    localStorage.removeItem(this.storageKey); // Clear stored site
    this.router.navigate(['/admin-login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }
}

