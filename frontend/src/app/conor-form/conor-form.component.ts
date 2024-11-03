import { NgIf, NgSwitchCase, NgSwitch, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-conor-form', // Replace with your actual component selector
  templateUrl: './conor-form.component.html', // Replace with your actual template URL
  styleUrls: ['./conor-form.component.css'], // Replace with your actual styles URL
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class ConorFormComponent implements OnInit {
  conorForm: FormGroup;
  intro = "";
  conclusion = "thank you";
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
  currentQuestionIndex = 0;
  showAnswers = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.conorForm = this.fb.group({});
    this.questions.forEach(question => {
      this.conorForm.addControl(question.controlName, this.fb.control(''));
    });
  }

  ngOnInit() {
    // Show answer options for the first question after a short delay
    this.showQuestionWithDelay();
  }

  showQuestionWithDelay() {
    this.showAnswers = false; // Hide options initially
    setTimeout(() => {
      this.showAnswers = true; // Show options after delay
    }, 500); // Adjust delay time (in milliseconds) as needed
  }

  onAnswerSelected() {
    const controlName = this.questions[this.currentQuestionIndex].controlName;
    const value = this.conorForm.get(controlName)?.value;

    // Automatically move to the next question if an answer is selected
    if (value !== undefined) {
      this.moveToNextQuestion();
    }
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.showQuestionWithDelay(); // Show next question with a delay for answer options
    } else {
      this.onSubmit(); // Automatically submit when the last question is answered
    }
  }

  onSubmit() {
    console.log("Form submitted:", this.conorForm.value);
    this.router.navigate(['/stress-form']);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
// import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
// import { HttpClient, HttpRequest } from '@angular/common/http';
// import { Router } from '@angular/router'
// import { distinctUntilChanged, timer } from 'rxjs';

// @Component({
//   standalone: true,
//   selector: 'app-conor-form',
//   templateUrl: './conor-form.component.html',
//   styleUrls: ['./conor-form.component.css'],
//   imports:[ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
// })
// export class ConorFormComponent implements OnInit{
//   conorForm: FormGroup;
//   currentQuestionIndex: number = 0;
//   showAnswers = false;
//   intro = "";
//   conclusion = "תודה רבה על התשובות. זה טבעי לחוש ככה. בואי נמשיך"
//   questions = [
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני מצליח.ה להסתגל לשינויי", 
//       controlName: "q1", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]   
//     },
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני יכול.ה להתמודד עם כל דבר", 
//       controlName: "q2", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]     
//     },
//     { 
//       label:"'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני רואה את הצד המשעשע בדברים", 
//       controlName: "q3", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]   
//     },
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'התמודדות עם לחץ מחזקת אותי", 
//       controlName: "q4", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]  
//     },
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני נוטה להתאושש בקלות ממחלה או קושי", 
//       controlName: "q5", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]   
//     },
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'תחת לחץ, אני מתמקד.ת וחושב בבהירות", 
//       controlName: "q6", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]   
//     },
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני יכול.ה להשיג את המטרות שלי למרות הקשיים", 
//       controlName: "q7", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]    
//     },
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני לא מתייאש.ת בקלות מכישלונות", 
//       controlName: "q8", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]    
//     },
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני חושב.ת על עצמי כעל אדם חזק", 
//       controlName: "q9", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]  
//     },
//     { 
//       label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני יכול.ה להתמודד עם רגשות לא נעימים", 
//       controlName: "q10", 
//       type: "radio", 
//       options: [
//         { label: "לא נכון בכלל", value: 0},
//         { label: "נכון לעיתים רחוקות", value: 1 },
//         { label: "לפעמים נכון", value: 2 },
//         { label: "נכון לעיתים קרובות", value: 3 },
//         { label: "נכון כמעט כל הזמן", value: 4}
//       ]  
//     },
  
//   ]
//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router
//   ) {
//     // Initialize the form group
//     // this.stressForm = new FormGroup({
//     this.conorForm = this.fb.group({
//       q1: new FormControl('',[Validators.min(1), Validators.max(120)]),
//       q2: new FormControl('', [Validators.min(1), Validators.max(120)]),
//       q3: new FormControl('', [Validators.min(1), Validators.max(120)]),
//       q4: new FormControl('', [Validators.min(1), Validators.max(120)]),
//       q5: new FormControl('', [Validators.min(1), Validators.max(120)]),
//       q6: new FormControl('', [Validators.min(1), Validators.max(120)]),
//       q7: new FormControl('', [Validators.min(1), Validators.max(120)]),
//       q8: new FormControl('', [Validators.min(1), Validators.max(120)]),
//       q9: new FormControl('', [Validators.min(1), Validators.max(120)]),
//       q10: new FormControl('', [Validators.min(1), Validators.max(120)]),
//     });
//   }

//   ngOnInit(): void {
//     this.setUpAutoNextQuestion();
//   }
//   initializeForm(){
//     const controlsConfig: { [key: string]: any } = {};
//     this.questions.forEach((q) => {
//       controlsConfig[q.controlName] = [''];
//     });
//     this.conorForm = this.fb.group(controlsConfig);
//   }
//   setUpAutoNextQuestion(){
//     const currentControlName = this.questions[this.currentQuestionIndex].controlName;
//     this.conorForm.get(currentControlName)?.valueChanges
//     .pipe(distinctUntilChanged())
//     .subscribe(value => {
//       if (value !== null && value !== undefined) {
//         console.log(value);
//         this.onNextQuestion();
//       }
//     });
//   }
//   onNextQuestion() {
//     if (this.currentQuestionIndex < this.questions.length -1) {
//       this.currentQuestionIndex++;
//       this.showAnswers = false; // Hide options initially
   
//     }
//     else{
//       this.onSubmit();
//     }

//   }
//   onSubmit() {
//     timer(100).subscribe(() => {
//       const allFilled = Object.values(this.conorForm.controls).every(control => control.value !== null && control.value !== undefined && control.value !== '');
      
//       if (allFilled) {
//         console.log('Form submitted:', this.conorForm.value);
//       } else {
//         console.warn('Not all fields are filled. Submission halted.');
//       }
//     });
//     // console.log('Form submitted:', this.conorForm.value);
//   }
//   onAnswerSelected() {
//     const controlName = this.questions[this.currentQuestionIndex].controlName;
//     if (this.conorForm.get(controlName)?.value) {
//       this.onNextQuestion();
//     }
//   }
// }