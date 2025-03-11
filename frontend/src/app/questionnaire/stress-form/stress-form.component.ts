import { NgIf, NgSwitchCase, NgSwitch, NgForOf, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-stress-form', // Replace with your actual component selector
  templateUrl: './stress-form.component.html', // Replace with your actual template URL
  styleUrls: ['./stress-form.component.css'], // Replace with your actual styles URL
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class StressFormComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  stressForm: FormGroup;
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
      content: "במהלך השבועיים האחרונים, באיזו תדירות היית מוטרד מהבעיות הבאות:"
    },
    { 
      outputType: "question",
      label: "הרגשתי עצבני.ת , חרד.ה או מתוח.ה מאוד", 
      controlName: "q1", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "כמה ימים", value: 1 },
        { label: "יותר ממחצית הימים", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "לא הייתי מסוגל.ת להפסיק לדאוג או לשלוט בדאגה", 
      controlName: "q2", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "כמה ימים", value: 1 },
        { label: "יותר ממחצית הימים", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "הייתי מודאג.ת יותר מידי בנוגע לדברים שונים", 
      controlName: "q3", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "כמה ימים", value: 1 },
        { label: "יותר ממחצית הימים", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    { 
      outputType: "question",
      label: "התקשיתי להירגע", 
      controlName: "q4", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "כמה ימים", value: 1 },
        { label: "יותר ממחצית הימים", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },{ 
      outputType: "question",
      label: "הייתי כל כך חסר.ת מנוחה שהיה לי קשה לשבת מבלי לנוע", 
      controlName: "q5", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "כמה ימים", value: 1 },
        { label: "יותר ממחצית הימים", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },{ 
      outputType: "question",
      label: "הייתי מתעצבן.ת או מתרגז.ת בקלות", 
      controlName: "q6", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "כמה ימים", value: 1 },
        { label: "יותר ממחצית הימים", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },{ 
      outputType: "question",
      label: "פחדתי כאילו משהו נורא עלול לקרות", 
      controlName: "q7", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: "כמה ימים", value: 1 },
        { label: "יותר ממחצית הימים", value: 2 },
        { label: "כמעט כל יום ", value: 3 }
      ]
    },
    {
      outputType: "statement",
      content: "בהחלט תקופה מאתגרת, חשוב מאד שאת.ה משתפ.ת ומקדיש.ה זמן לעצמך."
    },
  ]


  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // Inject HttpClient here
    private router: Router,
  ){
    this.stressForm = this.fb.group({});
    this.outputs.forEach(output => {
      if(output['outputType'] === "question"){
        this.stressForm.addControl(output.controlName!, this.fb.control(''));
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
      { label: "כמה ימים", value: 1 },
      { label: "יותר ממחצית הימים", value: 2 },
      { label: "כמעט כל יום ", value: 3 }
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

    const values = Object.values(this.stressForm.value) as number[]; // Type assertion
    let sum = 0;
    values.forEach((num: number) => {
      sum += num;
    });

    const today = new Date().toLocaleDateString('en-GB');
    
    this.http.post('https://tovademo.onrender.com/api/modify-user', [user, "gad-7_results - "+today, {...this.stressForm.value, sum}])
    .subscribe(res => {
      // const response = JSON.stringify(res);
      console.log("response", res);
    });

    setTimeout(() => {
      this.router.navigate(['/conclusion'])
    }, 3000)
  }
}