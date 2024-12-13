import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
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
export class LightupIntroComponent implements AfterViewChecked{
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  introForm: FormGroup;
  displayedItems: Array<any> = [];
  showAnswers1 = false;
  showAnswers2 = false;
  currentIndex = 0;
  showSubmit = false;
  outputs = [
    {
      outputType: "statement",
      content: "שלום, אנחנו שמחים מאד שהצטרפת לתוכנית Lightup. במשך שלושת החודשים הבאים נעבור מסע משותף בדרך לבניית שגרה מטיבה. ",

    },
    {
      outputType: "statement",
      content: "השנה האחרונה הייתה מטלטלת עבור כולנו ורבים מאיתנו חווים קשיים שונים ביום יום בעקבות כך. השאלון הבא יאפשר לנו להכיר אותך קצת יותר ולהבין מה את.ה חש.ה היום ובזמן הזה. דרכו נוכל להבין כיצד לבנות יחד תהליך משמעותי ומועיל לאורך התכנית. השאלון אנונימי, לא נשמרים פרטים מזהים שלך."
    },
    {
      outputType: "statement",
      content: "השאלון הבא עוזר לנו להבין טוב יותר איך את מרגישה היום ולהתאים את התוכנית טוב יותר עבורך. לא נשמרים פרטים מזהים שלך."
    },
    {
      outputType: "question",
      type: "radio",
      label: "לפני שנמשיך, תוכל.י בבקשה לסמן מה המגדר שלך",
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
      label: "תרצ.י לשתף איך את מרגישה היום",
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
        else{
            this.showAnswers2 = true; // Show answers after delay
            setTimeout(() => {
              this.showSubmit = true; // Show answers after delay
            }, 2000); // Delay before showing radio options
        }
      }
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
  onSubmit(){
    const user = sessionStorage['user'];
    const gender = this.introForm.value['gender'];
    sessionStorage.setItem('gender', gender);
    console.log(this.introForm.value)
    this.http.post('https://tova-demo.onrender.com/api/modify-user', [user, "intro_results", this.introForm.value])
      .subscribe(res => {
        // const response = JSON.stringify(res);
        console.log("response", res);
      });
      setTimeout(() => {
        this.router.navigate(['/new-questions'])
      }, 1000)
  }
}

