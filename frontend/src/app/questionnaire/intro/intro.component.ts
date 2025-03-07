import { HttpClient } from '@angular/common/http';
import { Component, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
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
      user: new FormControl('')  // Add default value here if needed
    });
  }


  onSubmit(){
    const user = this.form.value.user;
    console.log("user",user)
    sessionStorage.setItem('user', user);
    this.http.post('https://tovademo.onrender.com/api/create-user', user)
      .subscribe(res => {
        // const response = JSON.stringify(res);
        console.log("response", res);
      });
    this.router.navigate(['/lightup-intro']);
  }
}