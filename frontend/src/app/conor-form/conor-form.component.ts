import { NgIf, NgSwitchCase, NgSwitch, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  showConclusion = false;
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
    // { 
    //   label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'התמודדות עם לחץ מחזקת אותי", 
    //   controlName: "q4", 
    //   type: "radio", 
    //   options: [
    //     { label: "לא נכון בכלל", value: 0},
    //     { label: "נכון לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים נכון", value: 2 },
    //     { label: "נכון לעיתים קרובות", value: 3 },
    //     { label: "נכון כמעט כל הזמן", value: 4}
    //   ]  
    // },
    // { 
    //   label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני נוטה להתאושש בקלות ממחלה או קושי", 
    //   controlName: "q5", 
    //   type: "radio", 
    //   options: [
    //     { label: "לא נכון בכלל", value: 0},
    //     { label: "נכון לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים נכון", value: 2 },
    //     { label: "נכון לעיתים קרובות", value: 3 },
    //     { label: "נכון כמעט כל הזמן", value: 4}
    //   ]   
    // },
    // { 
    //   label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'תחת לחץ, אני מתמקד.ת וחושב בבהירות", 
    //   controlName: "q6", 
    //   type: "radio", 
    //   options: [
    //     { label: "לא נכון בכלל", value: 0},
    //     { label: "נכון לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים נכון", value: 2 },
    //     { label: "נכון לעיתים קרובות", value: 3 },
    //     { label: "נכון כמעט כל הזמן", value: 4}
    //   ]   
    // },
    // { 
    //   label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני יכול.ה להשיג את המטרות שלי למרות הקשיים", 
    //   controlName: "q7", 
    //   type: "radio", 
    //   options: [
    //     { label: "לא נכון בכלל", value: 0},
    //     { label: "נכון לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים נכון", value: 2 },
    //     { label: "נכון לעיתים קרובות", value: 3 },
    //     { label: "נכון כמעט כל הזמן", value: 4}
    //   ]    
    // },
    // { 
    //   label: "'חשבי על החודש האחרון, עד כמה נכון לגביך ההיגד 'אני לא מתייאש.ת בקלות מכישלונות", 
    //   controlName: "q8", 
    //   type: "radio", 
    //   options: [
    //     { label: "לא נכון בכלל", value: 0},
    //     { label: "נכון לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים נכון", value: 2 },
    //     { label: "נכון לעיתים קרובות", value: 3 },
    //     { label: "נכון כמעט כל הזמן", value: 4}
    //   ]    
    // },
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
    private http: HttpClient, // Inject HttpClient here
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
    // }, 1000); // Adjust delay time (in milliseconds) as needed
  }, 1)
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

  getValueName(value: number){
    const options = [
      { label: "לא נכון בכלל", value: 0},
      { label: "נכון לעיתים רחוקות", value: 1 },
      { label: "לפעמים נכון", value: 2 },
      { label: "נכון לעיתים קרובות", value: 3 },
      { label: "נכון כמעט כל הזמן", value: 4}
    ]
    return options[value].label;
      
  }

  onSubmit() {
    console.log("Form submitted:", this.conorForm.value);
    setTimeout(() => {
      this.showConclusion = true;
    // }, 1000)
  }, 1)
    const user = sessionStorage['user'];
    this.http.post('http://localhost:3000/api/modify-user', [user, "conor_results", this.conorForm.value])
    .subscribe(res => {
      // const response = JSON.stringify(res);
      console.log("response", res);
    });
    setTimeout(() => {
      this.router.navigate(['/conor-form'])
    // }, 1000)
  }, 1)

    setTimeout(() => {
      this.router.navigate(['/stress-form'])
    // }, 1000)
  }, 1)
  }
}