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
      outputType: "question",
      type: "radio",
      label: "שלום! לפני שנתחיל,סמני בבקשה את המגדר שלך:",
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
      label: "מה שלומך היום?",
      controlName: "wellbeing"
    },
    {
      outputType: "statement",
      content: "השאלון הבא נועד לבחון יחד את ההרגשה שלך בימים אלה. דרכו נוכל ללמוד על התהליך האישי שלך במהלך התכנית ולהתכוונן נכון עבורך. חשוב לדעת: השאלון נעשה באופן אנונימי על מנת לשמור על פרטיותך."
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

