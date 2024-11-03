import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgSwitchCase, NgSwitch, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lightup-intro',
  standalone: true,
  templateUrl: './lightup-intro.component.html',
  styleUrls: ['./lightup-intro.component.css'], // Corrected from styleUrl to styleUrls
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class LightupIntroComponent {
  introForm: FormGroup;
  displayedItems: Array<any> = [];
  showAnswers = false;
  currentIndex = 0;
  outputs = [
    {
      outputType: "statement",
      content: "שלום, אנחנו שמחים מאד שהצטרפת לתוכנית Lightup. במשך שלושת החודשים הבאים נעבור מסע משותף בדרך לבניית שגרה מטיבה. "
    },
    {
      outputType: "statement",
      content: "השנה האחרונה הייתה מטלטלת עבור כולנו ורבים מאיתנו חווים קשיים שונים ביום יום בעקבות כך. השאלון הבא יאפשר לנו להכיר אותך קצת יותר ולהבין מה את חשה היום ובזמן הזה. דרכו נוכל להבין כיצד לבנות יחד תהליך משמעותי ומועיל לאורך התכנית. השאלון אנונימי, לא נשמרים פרטים מזהים שלך."
    },
    {
      outputType: "question",
      type: "radio",
      label: "לפני שנמשיך, תוכל/י בבקשה לסמן מה המגדר שלך?",
      controlName: "gender",
      options: [
        {label: "זכר", value: "man"},
        {label: "נקבה", value: "woman"},
        {label: "אחר", value: "other"},
      ],
    },
    {
      outputType: "statement",
      content: "תודה רבה!"
    },
    {
      outputType: "question",
      type: "text",
      label: "תרצי לשתף איך את מרגישה היום?",
      controlName: "wellbeing"
    }

  ]
  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // Inject HttpClient here
    private router: Router,
  ){
    this.introForm = this.fb.group({});
    this.outputs.forEach(output => {
      if(output['outputType'] === "question"){
        this.introForm.addControl(output.controlName!, this.fb.control(''));
      }
      
    });
  }
  ngOnInit() {
    // Show answer options for the first question after a short delay
    this.showNextItem();
  }
  showNextItem() {
    if (this.currentIndex < this.outputs.length) {
      const currentItem = this.outputs[this.currentIndex];
      this.displayedItems.push(currentItem); // Add current item to displayedItems array

      if (currentItem.outputType === 'statement') {
        this.currentIndex++;
        // setTimeout(() => this.showNextItem(), 2000); // Delay to show next statement
        setTimeout(() => this.showNextItem(), 1); // use shorter delay for testing
      } else if (currentItem.outputType === 'question') {
        if (currentItem.type === 'radio') {
          this.showAnswers = false; // Initially hide answers
          setTimeout(() => {
            this.showAnswers = true; // Show answers after delay
          // }, 1000); // Delay before showing radio options
          }, 1); //use a shorter delay for testing
        }
        this.currentIndex++; // Move to next item after showing question
      }
    }
  }
  showQuestionWithDelay() {
    this.showAnswers = false; // Hide options initially
    setTimeout(() => {
      this.showAnswers = true; // Show options after delay
    // }, 500); // Adjust delay time (in milliseconds) as needed
    }, 1); //use a shorter delay for testing
  }
  onAnswerSelected() {
    if (this.currentIndex <= this.outputs.length) {
      this.showNextItem(); // Move to next item on answer selection
    }
  }
  onSubmit(){
    const user = sessionStorage['user'];
    console.log(this.introForm.value)
    this.http.post('http://localhost:3000/api/modify-user', [user, "intro_results", this.introForm.value])
      .subscribe(res => {
        // const response = JSON.stringify(res);
        console.log("response", res);
      });
      setTimeout(() => {
        this.router.navigate(['/conor-form'])
      // }, 1000)
    }, 1)
  }
}

