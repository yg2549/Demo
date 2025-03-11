import { NgIf, NgSwitchCase, NgSwitch, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-conor-form', // Replace with your actual component selector
  templateUrl: './conor-form.component.html', // Replace with your actual template URL
  styleUrls: ['./conor-form.component.css'], // Replace with your actual styles URL
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class ConorFormComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  conorForm: FormGroup;
  intro = "";
  conclusion = "continue";
  showConclusion = false;
  displayedItems: Array<any> = [];
  showAnswers1 = false;
  showAnswers2 = false;
  currentIndex = 0;
  showSubmit = false;

  outputs = [
    {
      outputType: "statement",
      content: "חשב.י על השבועיים האחרונים, עד כמה נכון לגביך ההגדים הבאים:"
    },
    { 
      outputType: "question",
      label: "אני מצליח.ה להסתגל לשינויים", 
      controlName: "q1", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },
    { 
      outputType: "question",
      label: "אני יכול.ה להתמודד עם כל דבר", 
      controlName: "q2", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },
    { 
      outputType: "question",
      label: "אני רואה את הצד המשעשע בדברים", 
      controlName: "q3", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },
    { 
      outputType: "question",
      label: "התמודדות עם לחץ מחזקת אותי", 
      controlName: "q4", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },
    { 
      outputType: "question",
      label: "אני נוטה להתאושש בקלות ממחלה או קושי", 
      controlName: "q5", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },{ 
      outputType: "question",
      label: "תחת לחץ, אני מתמקד.ת וחושב בבהירות", 
      controlName: "q6", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },{ 
      outputType: "question",
      label: "אני יכול.ה להשיג את המטרות שלי למרות הקשיים", 
      controlName: "q7", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },{ 
      outputType: "question",
      label: "אני לא מתייאש.ת בקלות מכישלונות", 
      controlName: "q8", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },{ 
      outputType: "question",
      label: "אני חושב.ת על עצמי כעל אדם חזק", 
      controlName: "q9", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },{ 
      outputType: "question",
      label: "יכול.ה להתמודד עם רגשות לא נעימים", 
      controlName: "q10", 
      type: "radio", 
      options: [
        { label: "לא נכון בכלל", value: 0},
        { label: "נכון לעיתים רחוקות", value: 1 },
        { label: "לפעמים נכון", value: 2 },
        { label: "נכון לעיתים קרובות", value: 3 },
        { label: "נכון כמעט כל הזמן", value: 4 }
      ]
    },
    {
      outputType: "statement",
      content: "תודה על השיתוף. חשוב לתת מקום לתחושות ולרגשות שלנו. עוד כמה שאלות וסיימנו."
    },
  ]


  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // Inject HttpClient here
    private router: Router,
  ){
    this.conorForm = this.fb.group({});
    this.outputs.forEach(output => {
      if(output['outputType'] === "question"){
        this.conorForm.addControl(output.controlName!, this.fb.control(''));
      }
      
    });
  }

  ngOnInit() {
    // Show answer options for the first question after a short delay
    this.showNextItem();
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom(); 
  }
  private scrollToBottom(): void {
    // console.log("called");
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }
  showNextItem() {
    if (this.currentIndex < this.outputs.length) {
      const currentItem = this.outputs[this.currentIndex];
        // setTimeout(() => {
          console.log(this.currentIndex);
          this.displayedItems.push(currentItem); // Add current item to displayedItems array
        // }, 1000 * this.currentIndex)

      if (currentItem.outputType === 'statement') {
        setTimeout(() => {
          this.currentIndex++;
          this.showNextItem();
        }, 1500);
          
      }
      else if (currentItem.outputType === 'question') {
        if(currentItem.type == 'radio'){
          this.showAnswers1 = true; // Show answers after delay
        }
      }
    }
    else{
            this.showAnswers2 = true; // Show answers after delay
            setTimeout(() => {
              this.showSubmit = true; // Show answers after delay
            }, 2000); // Delay before showing radio options
      }
    }



  onAnswerSelected() {
    if (this.currentIndex <= this.outputs.length) {
      setTimeout(() => {
        this.currentIndex++; // Move to next item after showing question
        this.showNextItem(); // Move to next item on answer selection
      }, 500);
    }
  }
  getValueName(value: number){
    const options = [
      { label: "לא נכון בכלל", value: 0},
      { label: "נכון לעיתים רחוקות", value: 1 },
      { label: "לפעמים נכון", value: 2 },
      { label: "נכון לעיתים קרובות", value: 3 },
      { label: "נכון כמעט כל הזמן", value: 4 }
    ]
    return options[value].label;
      
  }
          
  onSubmit() {
    console.log("Form submitted:", this.conorForm.value);
    setTimeout(() => {
      this.showConclusion = true;
    }, 1000)
  // }, 1)
    const user = sessionStorage['user'];


    const values = Object.values(this.conorForm.value) as number[]; // Type assertion
    let sum = 0;
    values.forEach((num: number) => {
      sum += num;
    });


    const today = new Date().toLocaleDateString('en-GB');
    this.http.post('https://tovademo.onrender.com/api/modify-user', [user, "conor_results - "+today, {...this.conorForm.value, sum}])
    .subscribe(res => {
      // const response = JSON.stringify(res);
      console.log("response", res);
    });

    setTimeout(() => {
      this.router.navigate(['/stress-form'])
    }, 3000)
  }
}