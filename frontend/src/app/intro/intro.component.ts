import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgSwitchCase, NgSwitch, NgForOf } from '@angular/common';

@Component({
  selector: 'app-intro',
  standalone: true,
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'], // Corrected from styleUrl to styleUrls
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class IntroComponent {
  introForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient // Inject HttpClient here
  ){
    this.introForm = this.fb.group({
      username: new FormControl(''),
    });
  }

  onSubmit(){
    const username = this.introForm.value.username;
    sessionStorage.setItem('username', username);
    // this.http.post('http://localhost:3000/api/create-user', username)
    //   .subscribe(res => {
      //   // const response = JSON.stringify(res);
      //   console.log("response", res);
      // });
  }
}

