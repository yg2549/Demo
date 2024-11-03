import { NgIf, NgSwitchCase, NgSwitch, NgForOf, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-stress-form', // Replace with your actual component selector
  templateUrl: './stress-form.component.html', // Replace with your actual template URL
  styleUrls: ['./stress-form.component.css'], // Replace with your actual styles URL
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class StressFormComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  stressForm: FormGroup;
  intro = "";
  conclusion = "thank you";
  showConclusion = false;
  // scrollContainer: any
  questions = [
    { 
      label: "?בחודש האחרון, באיזו מידה היית 'מעוצבנ.ת' בגלל משהו שקרה באופן בלתי צפוי", 
      controlName: "q1", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]   
    },
    { 
      label: "?בחודש האחרון, באיזו מידה הרגשת חוסר שליטה בדברים החשובים בחייך", 
      controlName: "q2", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]   
    },
    { 
      label:"?'בחודש האחרון, באיזו מידה הרגשת עצבני/ת ו'לחוצ.ה", 
      controlName: "q3", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]
    },
    { 
      label: "?בחודש האחרון, באיזו מידה טיפלת בהצלחה במטרדים מרגיזים", 
      controlName: "q4", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]
    },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה הרגשת שאת/ה מתמודד.ת ביעילות עם שינויים חשובים בחייך", 
    //   controlName: "q5", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ]
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה הרגשת בטחון ביכולתך לטפל בבעיותיך האישיות", 
    //   controlName: "q6", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ] 
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה הרגשת שהדברים מתפתחים בהתאם לרצונך", 
    //   controlName: "q7", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ]   
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה יכולת להתמודד עם כל הדברים שהיה עליך לעשות", 
    //   controlName: "q8", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ] 
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה יכולת לשלוט בדברים המרגיזים אותך", 
    //   controlName: "q9", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ] 
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה הרגשת שאת שולט.ת במצב", 
    //   controlName: "q10", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ] 
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה התרגזת בגלל אירועים שהיו מחוץ לשליטתך", 
    //   controlName: "q11", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ]
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה הטרידו אותך מחשבות על דברים שהיה עליך להשלים", 
    //   controlName: "q12", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ]  
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה יכולת לשלוט בדרך שבה את/ה מנצל.ת את זמנך", 
    //   controlName: "q13", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ]  
    // },
    // { 
    //   label: "?בחודש האחרון, באיזו מידה הרגשת שהקשיים מצטברים עד כדי כך שלא יכולת להתגבר עליהם", 
    //   controlName: "q14", 
    //   type: "radio", 
    //   options: [
    //     { label: "כמעט אף פעם", value: 0},
    //     { label: "לעיתים רחוקות", value: 1 },
    //     { label: "לפעמים", value: 2 },
    //     { label: "לעיתים קרובות", value: 3 },
    //     { label: "לעיתים קרובות מאד", value: 4}
    //   ]  
    // },
  
  ]
  currentQuestionIndex = 0;
  showAnswers = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // Inject HttpClient here
    private router: Router,
    private scroller: ViewportScroller
  ) {
    this.stressForm = this.fb.group({});
    this.questions.forEach(question => {
      this.stressForm.addControl(question.controlName, this.fb.control(''));
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom(); // Call scroll after each check
  }

  ngOnInit() {
    this.showQuestionWithDelay();
  }

  showQuestionWithDelay() {
    // this.scrollToBottom();
    this.showAnswers = false; // Hide options initially
    setTimeout(() => {
      this.showAnswers = true; // Show options after delay
      this.scrollToBottom();
    }, 1000); // Adjust delay time (in milliseconds) as needed
  // }, 1)
  }

  onAnswerSelected() {
    const controlName = this.questions[this.currentQuestionIndex].controlName;
    const value = this.stressForm.get(controlName)?.value;

    // Automatically move to the next question if an answer is selected
    if (value !== undefined) {
      this.moveToNextQuestion();
    }
  }
  testMethod(){
    console.log("current scroll top",this.scrollContainer.nativeElement.scrollTop);
    console.log("current scroll height", this.scrollContainer.nativeElement.scrollHeight);
  }
  moveToNextQuestion() {
    this.currentQuestionIndex++;
    // if(this.currentQuestionIndex == 5){
      this.testMethod();
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      this.scroller.scrollToPosition([0, this.scrollContainer.nativeElement.scrollHeight])
      this.testMethod();
    // }
    const container = document.getElementById('scrollContainer')?.offsetHeight;
    if (this.currentQuestionIndex < this.questions.length) {
      this.showQuestionWithDelay(); // Show next question with a delay for answer options
    } else {
      this.onSubmit(); // Automatically submit when the last question is answered
    }
  }

  private scrollToBottom(): void {
    setTimeout(() =>{
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    },500)
  }
  getValueName(value: number){
    const options = [
      { label: "כמעט אף פעם", value: 0},
      { label: "לעיתים רחוקות", value: 1 },
      { label: "לפעמים", value: 2 },
      { label: "לעיתים קרובות", value: 3 },
      { label: "לעיתים קרובות מאד", value: 4}
    ]
    return options[value].label;
      
  }
          
  onSubmit() {
    console.log("Form submitted:", this.stressForm.value);
    setTimeout(() => {
      this.showConclusion = true;
    }, 1000)
  // }, 1)
    const user = sessionStorage['user'];
    this.http.post('http://localhost:3000/api/modify-user', [user, "stress_results", this.stressForm.value])
    .subscribe(res => {
      // const response = JSON.stringify(res);
      console.log("response", res);
    });

    setTimeout(() => {
      this.router.navigate(['/stress-form'])
    }, 1000)
  // }, 1)
  }
}
// import { NgIf, NgSwitchCase, NgSwitch, NgForOf } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   standalone: true,
//   selector: 'app-stress-form', // Replace with your actual component selector
//   templateUrl: './stress-form.component.html', // Replace with your actual template URL
//   styleUrls: ['./stress-form.component.css'], // Replace with your actual styles URL
//   imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
// })
// export class StressFormComponent implements OnInit {
//   conorForm: FormGroup;
//   intro = "";
//   conclusion = ".בהחלט תקופה מאתגרת, חשוב מאד שאת משתפת ומקדישה זמן לעצמך";
//   showConclusion = false;
//   questions = [
//     { 
//       label: "?בחודש האחרון, באיזו מידה היית 'מעוצבנ.ת' בגלל משהו שקרה באופן בלתי צפוי", 
//       controlName: "q1", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 0},
//         { label: "לעיתים רחוקות", value: 1 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 3 },
//         { label: "לעיתים קרובות מאד", value: 4}
//       ]   
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה הרגשת חוסר שליטה בדברים החשובים בחייך", 
//       controlName: "q2", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 0},
//         { label: "לעיתים רחוקות", value: 1 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 3 },
//         { label: "לעיתים קרובות מאד", value: 4}
//       ]   
//     },
//     { 
//       label:"?'בחודש האחרון, באיזו מידה הרגשת עצבני/ת ו'לחוצ.ה", 
//       controlName: "q3", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 0},
//         { label: "לעיתים רחוקות", value: 1 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 3 },
//         { label: "לעיתים קרובות מאד", value: 4}
//       ]
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה טיפלת בהצלחה במטרדים מרגיזים", 
//       controlName: "q4", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 4 },
//         { label: "לעיתים רחוקות", value: 3 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 2 },
//         { label: "לעיתים קרובות מאד", value: 1}
//       ]
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה הרגשת שאת/ה מתמודד.ת ביעילות עם שינויים חשובים בחייך", 
//       controlName: "q5", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 4},
//         { label: "לעיתים רחוקות", value: 3 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 2 },
//         { label: "לעיתים קרובות מאד", value: 1}
//       ]
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה הרגשת בטחון ביכולתך לטפל בבעיותיך האישיות", 
//       controlName: "q6", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 4},
//         { label: "לעיתים רחוקות", value: 3 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 1 },
//         { label: "לעיתים קרובות מאד", value: 0}
//       ] 
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה הרגשת שהדברים מתפתחים בהתאם לרצונך", 
//       controlName: "q7", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 4},
//         { label: "לעיתים רחוקות", value: 3 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 1 },
//         { label: "לעיתים קרובות מאד", value: 0}
//       ]   
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה יכולת להתמודד עם כל הדברים שהיה עליך לעשות", 
//       controlName: "q8", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 0},
//         { label: "לעיתים רחוקות", value: 1 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 3 },
//         { label: "לעיתים קרובות מאד", value: 4}
//       ] 
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה יכולת לשלוט בדברים המרגיזים אותך", 
//       controlName: "q9", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 4},
//         { label: "לעיתים רחוקות", value: 3 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 1 },
//         { label: "לעיתים קרובות מאד", value: 0}
//       ] 
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה הרגשת שאת שולט.ת במצב", 
//       controlName: "q10", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 4},
//         { label: "לעיתים רחוקות", value: 3 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 1 },
//         { label: "לעיתים קרובות מאד", value: 0}
//       ] 
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה התרגזת בגלל אירועים שהיו מחוץ לשליטתך", 
//       controlName: "q11", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 0},
//         { label: "לעיתים רחוקות", value: 1 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 3 },
//         { label: "לעיתים קרובות מאד", value: 4}
//       ]
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה הטרידו אותך מחשבות על דברים שהיה עליך להשלים", 
//       controlName: "q12", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 0},
//         { label: "לעיתים רחוקות", value: 1 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 3 },
//         { label: "לעיתים קרובות מאד", value: 4}
//       ]  
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה יכולת לשלוט בדרך שבה את/ה מנצל.ת את זמנך", 
//       controlName: "q13", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 4},
//         { label: "לעיתים רחוקות", value: 3 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 1 },
//         { label: "לעיתים קרובות מאד", value: 0}
//       ]  
//     },
//     { 
//       label: "?בחודש האחרון, באיזו מידה הרגשת שהקשיים מצטברים עד כדי כך שלא יכולת להתגבר עליהם", 
//       controlName: "q14", 
//       type: "radio", 
//       options: [
//         { label: "כמעט אף פעם", value: 0},
//         { label: "לעיתים רחוקות", value: 1 },
//         { label: "לפעמים", value: 2 },
//         { label: "לעיתים קרובות", value: 3 },
//         { label: "לעיתים קרובות מאד", value: 4}
//       ]  
//     },
  
//   ]
//   currentQuestionIndex = 0;
//   showAnswers = false;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router
//   ) {
//     this.conorForm = this.fb.group({});
//     this.questions.forEach(question => {
//       this.conorForm.addControl(question.controlName, this.fb.control(''));
//     });
//   }

//   ngOnInit() {
//     // Show answer options for the first question after a short delay
//     this.showQuestionWithDelay();
//   }

//   showQuestionWithDelay() {
//     this.showAnswers = false; // Hide options initially
//     setTimeout(() => {
//       this.showAnswers = true; // Show options after delay
//     // }, 1000); // Adjust delay time (in milliseconds) as needed
//     }, 1); //change delay for testing
//   }

//   onAnswerSelected() {
//     const controlName = this.questions[this.currentQuestionIndex].controlName;
//     const value = this.conorForm.get(controlName)?.value;

//     // Automatically move to the next question if an answer is selected
//     if (value !== undefined) {
//       this.moveToNextQuestion();
//     }
//   }

//   moveToNextQuestion() {
//     this.currentQuestionIndex++;
//     if (this.currentQuestionIndex < this.questions.length) {
//       this.showQuestionWithDelay(); // Show next question with a delay for answer options
//     } else {
//       this.onSubmit(); // Automatically submit when the last question is answered
//     }
//   }

//   getValueName(value: number){
//     const options = [
//       { label: "כמעט אף פעם", value: 0},
//       { label: "לעיתים רחוקות", value: 1 },
//       { label: "לפעמים", value: 2 },
//       { label: "לעיתים קרובות", value: 3 },
//       { label: "לעיתים קרובות מאד", value: 4}
//     ]

//     return options[value].label;
//   }

//   onSubmit() {
//     this.showConclusion = true;
//     const user = sessionStorage['user'];
//     this.http.post('http://localhost:3000/api/modify-user', [user, "stress_results", this.conorForm.value])
//     .subscribe(res => {
//       // const response = JSON.stringify(res);
//       console.log("response", res);
//     });
//     console.log("Form submitted:", this.conorForm.value);

//     this.http.post('http://localhost:3000/api/export-results', [user]).subscribe(
//       res => {
//         console.log("response", res)
//       }
//     )
//   }
// }