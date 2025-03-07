import { NgIf, NgSwitchCase, NgSwitch, NgForOf, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-questions',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf],
  templateUrl: './new-questions.component.html',
  styleUrl: './new-questions.component.css'
})
export class NewQuestionsComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  newQuestionsForm: FormGroup;
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
      content: "במהלך השבועיים האחרונים, באיזו תדירות היית מוטרד מכל אחת מן הבעיות הבאות?"
    },
    { 
      outputType: "question",
      label: "עניין או הנאה מועטת מעשיית דברים", 
      controlName: "q1", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "מספר ימים", value: 1 },
        { label: "ביותר ממחצית מן הימים ", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "תחושת דכדוך, דיכאון, או חוסר תקווה", 
      controlName: "q2", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "מספר ימים", value: 1 },
        { label: "ביותר ממחצית מן הימים ", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "קשיים בהירדמות או בשינה רציפה, או עודף שינה", 
      controlName: "q3", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "מספר ימים", value: 1 },
        { label: "ביותר ממחצית מן הימים ", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "תחושה של עייפות או אנרגיה מועטה", 
      controlName: "q4", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "מספר ימים", value: 1 },
        { label: "ביותר ממחצית מן הימים ", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "תיאבון מועט או אכילות יתר", 
      controlName: "q5", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "מספר ימים", value: 1 },
        { label: "ביותר ממחצית מן הימים ", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "מרגיש.ה רע לגבי עצמך - מרגיש.ה שאת.ה כישלון או שאכזבת את עצמך או את משפחתך", 
      controlName: "q6", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "מספר ימים", value: 1 },
        { label: "ביותר ממחצית מן הימים ", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "קושי להתרכז בדברים, כמו קריאה בעיתון או צפייה בטלוויזיה", 
      controlName: "q7", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "מספר ימים", value: 1 },
        { label: "ביותר ממחצית מן הימים ", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "היית מדבר.ת או נע.ה באיטיות עד שאחרים הבחינו בכך? או להיפך  - היית חסר.ת שקט ומנוחה כך שהיית צריכ.ה להסתובב יותר מהרגיל", 
      controlName: "q8", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "מספר ימים", value: 1 },
        { label: "ביותר ממחצית מן הימים ", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
  ]


  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // Inject HttpClient here
    private router: Router,
  ){
    this.newQuestionsForm = this.fb.group({});
    this.outputs.forEach(output => {
      if(output['outputType'] === "question"){
        this.newQuestionsForm.addControl(output.controlName!, this.fb.control(''));
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
      { label: "כלל לא", value: 0},
      { label: "מספר ימים", value: 1 },
      { label: "ביותר ממחצית מן הימים ", value: 2 },
      { label: "כמעט כל יום ", value: 3 }
    ]
    return options[value].label;
      
  }
  onSubmit(){
    console.log("Form submitted:", this.newQuestionsForm.value);
    setTimeout(() => {
      this.showConclusion = true;
    }, 1000)
  // }, 1)
    const user = sessionStorage['user'];

    const values = Object.values(this.newQuestionsForm.value) as number[]; // Type assertion
    let sum = 0;
    values.forEach((num: number) => {
      sum += num;
    });

    const today = new Date().toLocaleDateString('en-GB');
    this.http.post('https://tovademo.onrender.com/api/modify-user', [user, "phq-9_results - "+today, {...this.newQuestionsForm.value, sum}])
      .subscribe(res => {
        // const response = JSON.stringify(res);
        console.log("response", res);
      });
      setTimeout(() => {
        this.router.navigate(['/conor-form'])
      }, 1000)
  }
}
