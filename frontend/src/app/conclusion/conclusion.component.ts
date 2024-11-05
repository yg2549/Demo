import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgSwitchCase, NgSwitch, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conclusion',
  standalone: true,
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css'], // Corrected from styleUrl to styleUrls
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class ConclusionComponent implements AfterViewChecked{
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  conclusionForm: FormGroup;
  displayedItems: Array<any> = [];
  showAnswers = false;
  currentIndex = 0;
  askMenstrual = false;
  showSubmit = false;
  outputs = [
    {
      outputType: "question",
      type: "radio",
      label: "האם שמת לב לשינויים במחזור החודשי שלך בחודשים האחרונים",
      controlName: "menstrualChanges",
      options: [
        {label: "כן", value: true},
        {label: "לא", value: false},
      ],
    },
    {
      outputType: "statement",
      content: "בסדר גמור"
    },
    {
      outputType: "question",
      type: "text",
      label: "תרצי לספר מה השינויים אליהם שמת לב",
      controlName: "changesExplained"
    },
    {
      outputType: "statement",
      content: "תודה רבה ששיתפת"
    },
    {
      outputType: "question",
      type: "text",
      label: "יש עוד משהו שתרצ.י לשתף",
      controlName: "additional comments"
    },
    {
      outputType: "statement",
      content: "מעולה, ענית על הכל, התשובות שלך יעזורו לצוות בחווה לבנות תוכנית מותאמת עבורך"
    },

  ]
  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // Inject HttpClient here
    private router: Router,
  ){
    this.conclusionForm = this.fb.group({});
    this.outputs.forEach(output => {
      if(output['outputType'] === "question"){
        this.conclusionForm.addControl(output.controlName!, this.fb.control(''));
      }      
    });
  }
  ngOnInit() {
    // Show answer options for the first question after a short delay
    this.showNextItem();
  }
  ngAfterViewChecked() {
    this.scrollToBottom(); // Call scroll after each check
  }
  private scrollToBottom(): void {
    setTimeout(() =>{
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    },500)
  }
  showNextItem() {
    console.log(this.currentIndex);
    if (this.currentIndex < this.outputs.length) {
      const currentItem = this.outputs[this.currentIndex];
      if(sessionStorage['gender'] === "man" && (this.currentIndex === 0 || this.currentIndex === 1 || this.currentIndex === 2)){
        this.currentIndex++;
        this.showNextItem();
      }
      else if((this.currentIndex == 2 || this.currentIndex == 3) && this.askMenstrual == false){
        this.currentIndex++;
        this.showNextItem();
      }
      else if(this.currentIndex == 1 && this.askMenstrual == true){
        this.currentIndex++;
        this.showNextItem();
      }
      else{
        setTimeout(() => this.displayedItems.push(currentItem), 500);
         // Add current item to displayedItems array
        if (currentItem.outputType === 'statement') {
          this.currentIndex++;
          setTimeout(() => this.showNextItem(), 
          1000); // Delay to show next statement
            // setTimeout(() => this.showNextItem(), 1); // use shorter delay for testing
        }
        else if (currentItem.outputType === 'question') {
          if (currentItem.type === 'radio') {
            this.showAnswers = false; // Initially hide answers
            setTimeout(() => {
              this.showAnswers = true; // Show answers after delay
            }, 1000); // Delay before showing radio options
            // }, 1); //use a shorter delay for testing
          }
          this.currentIndex++; // Move to next item after showing question
        }
      }
    }
  }
  showQuestionWithDelay() {
    this.showAnswers = false; // Hide options initially
    setTimeout(() => {
      this.showAnswers = true; // Show options after delay
    }, 3000); // Adjust delay time (in milliseconds) as needed
    // }, 1); //use a shorter delay for testing
  }
  onAnswerSelected() {
    // console.log("here");
    console.log(this.currentIndex, this.outputs[this.currentIndex])
    if(this.currentIndex == 5){
      setTimeout(() => {
        this.showSubmit = true; // Show options after delay
      }, 2000);
    }
    if (this.conclusionForm.value.menstrualChanges == true){
      this.askMenstrual = true;
    }
    if (this.currentIndex == 2 || this.currentIndex == 4){
      // console.log("here");
      // setTimeout(() => {
        this.showNextItem();
      // }, 1000);
      // if(this.currentIndex == 4){
      // }
    }
    else if(this.currentIndex < this.outputs.length){
      this.showNextItem();
    }
    // console.log(this.askMenstrual)
  }
  test(){
    console.log("hi");
  }
  onSubmit(){
    const user = sessionStorage['user'];
    const gender = this.conclusionForm.value['gender'];
    sessionStorage.setItem('gender', gender);
    console.log(this.conclusionForm.value)
    this.http.post('https://tova-demo.onrender.com/api/modify-user', [user, "conclusion_results", this.conclusionForm.value])
      .subscribe(res => {
        // const response = JSON.stringify(res);
        console.log("response", res);
      });
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 3000)
  }
}