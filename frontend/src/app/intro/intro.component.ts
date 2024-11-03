import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {
  form: FormGroup
  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // Inject HttpClient here
    private router: Router,
  ){
    this.form = this.fb.group({
      username: new FormControl('')  // Add default value here if needed
    });
  }

  onSubmit(){
    const username = this.form.value.username;
    sessionStorage.setItem('username', username);
    this.http.post('http://localhost:3000/api/create-user', username)
      .subscribe(res => {
        // const response = JSON.stringify(res);
        console.log("response", res);
      });
    this.router.navigate(['/lightup-intro'])
  }
}
