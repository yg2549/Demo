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
      content: "ברוכים הבאים לתוכנית!"
    },
    {
      outputType: "question",
      type: "text",
      label: "מה שלומך היום?",
      controlName: "wellbeing"
    },
    {
      outputType: "statement",
      content: "השאלון הבא עוזר לנו להבין טוב יותר איך את.ה מרגיש.ה היום ולהתאים את התוכנית טוב יותר עבורך. נחזור על השאלון מספר פעמים לאורך התכנית, כך נוכל ללמוד יחד על ההתקדמות שלך."
    },{
      outputType: "statement",
      content: "חשוב לדעת: השאלון אנונימי, לא נשמרים פרטים מזהים שלך. "
    },
    {
      outputType: "statement",
      content: "בוא.י נתחיל"
    },

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
    console.log(this.introForm.value)
    const today = new Date().toLocaleDateString('en-GB');
    this.http.post('https://tovademo.onrender.com/api/modify-user', [user, "intro_results - "+today, this.introForm.value])
      .subscribe(res => {
        // const response = JSON.stringify(res);
        console.log("response", res);
      });
      setTimeout(() => {
        this.router.navigate(['/new-questions'])
      }, 1000)
  }
}

