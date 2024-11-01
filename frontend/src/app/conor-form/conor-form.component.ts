import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-conor-form',
  templateUrl: './conor-form.component.html',
  styleUrls: ['./conor-form.component.css'],
  imports:[ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class ConorFormComponent implements OnInit{
  conorForm: FormGroup;
  currentQuestionIndex: number = 0;
  next: boolean = false;
  intro = "";
  conclusion = "תודה רבה על התשובות. זה טבעי לחוש ככה. בואי נמשיך"
  questions = [
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני מצליח.ה להסתגל לשינויי", 
      controlName: "q1", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]   
    },
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני יכול.ה להתמודד עם כל דבר", 
      controlName: "q2", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]     
    },
    { 
      label:"'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני רואה את הצד המשעשע בדברים", 
      controlName: "q3", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]   
    },
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'התמודדות עם לחץ מחזקת אותי", 
      controlName: "q4", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]  
    },
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני נוטה להתאושש בקלות ממחלה או קושי", 
      controlName: "q5", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]   
    },
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'תחת לחץ, אני מתמקד.ת וחושב בבהירות", 
      controlName: "q6", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]   
    },
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני יכול.ה להשיג את המטרות שלי למרות הקשיים", 
      controlName: "q7", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]    
    },
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני לא מתייאש.ת בקלות מכישלונות", 
      controlName: "q8", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]    
    },
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני חושב.ת על עצמי כעל אדם חזק", 
      controlName: "q9", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]  
    },
    { 
      label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני יכול.ה להתמודד עם רגשות לא נעימים", 
      controlName: "q10", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4}
      ]  
    },
  
  ]
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the form group
    // this.stressForm = new FormGroup({
    this.conorForm = this.fb.group({
      q1: new FormControl('',[Validators.min(1), Validators.max(120)]),
      q2: new FormControl('', [Validators.min(1), Validators.max(120)]),
      q3: new FormControl('', [Validators.min(1), Validators.max(120)]),
      q4: new FormControl('', [Validators.min(1), Validators.max(120)]),
      q5: new FormControl('', [Validators.min(1), Validators.max(120)]),
      q6: new FormControl('', [Validators.min(1), Validators.max(120)]),
      q7: new FormControl('', [Validators.min(1), Validators.max(120)]),
      q8: new FormControl('', [Validators.min(1), Validators.max(120)]),
      q9: new FormControl('', [Validators.min(1), Validators.max(120)]),
      q10: new FormControl('', [Validators.min(1), Validators.max(120)]),
    });
  }

  ngOnInit(): void {
    this.conorForm.valueChanges.subscribe(() => {
      // const currentQuestionControl = this.conorForm.get(this.questions[this.currentQuestionIndex].controlName);
      // console.log(currentQuestionControl);
      // if (currentQuestionControl && currentQuestionControl.value) {
        // this.onNextQuestion();
      // }
      console.log("answer detected");
      this.onNextQuestion();
    });
  }
  onNextQuestion() {
    // if (this.currentQuestionIndex < this.questions.length - 1) {
    //   this.currentQuestionIndex++;
    // }
    // else{
    //   this.onSubmit();
    // }
    if (this.currentQuestionIndex < this.questions.length - 1) {
      const nextIndex = ++this.currentQuestionIndex;
      const nextControlName = this.questions[nextIndex].controlName;
      const nextControl = this.conorForm.get(nextControlName);
  
      // Subscribe to changes on the next question's control
      nextControl?.valueChanges.subscribe(value => {
        if (value) {
          this.onNextQuestion();
        }
      });
    }
    else{
      this.onSubmit();
    }

  }
  onSubmit() {
    console.log('Form submitted:', this.conorForm.value);
  }

  // wait() {
  //   this.conorForm.get(this.questions[this.currentQuestionIndex].controlName)?.statusChanges.subscribe(value => {
  //     console.log("yo");
  //     this.next = true;
  //     this.nextQuestion()
  //   });
  // }
  // nextQuestion() {
    // this.anxietyForm.get(this.questions[this.currentQuestionIndex].controlName)?.statusChanges.subscribe(value => {
    //   console.log("yo");
    //   this.next = true;
    //   console.log(this.next);
    // });
    
    // if (this.currentQuestionIndex < this.questions.length ) {
    //   this.currentQuestionIndex++;
    //   this.next = false;
    //   if(this.currentQuestionIndex < this.questions.length - 1){
    //     this.wait();
    //   }
      
      // Subscribe to the value changes of the next question's control
      // this.anxietyForm.get(this.questions[this.currentQuestionIndex].controlName)?.valueChanges.subscribe(value => {
      //   console.log("change");
      //   this.next = true;
      //   this.nextQuestion();
      // });
    // }
  // }

  // resetControl() {
  //   const controlName = this.questions[this.currentQuestionIndex].controlName;
  //   this.anxietyForm.get(controlName)?.setValue(''); // Reset the control value
  // }

  // onSubmit() {
  //   if (this.conorForm.valid) {
  //     const formData = JSON.stringify(this.conorForm.value);
  //     console.log('Form Submitted!', formData);
      
      // Send form data to the Flask backend
      // this.http.post('http://localhost:3000/api/stress-data', formData)
      // .subscribe(res => {
      //   const response = JSON.stringify(res)
      //   console.log("response",response)
      // });

      // this.router.navigate(['/resilience-form'])
  //   } else {
  //     console.log('Form is not valid');
  //   }
  // }
}