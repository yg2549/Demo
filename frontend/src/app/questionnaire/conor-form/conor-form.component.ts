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
      content: "במהלך השבועיים האחרונים עד כמה התסמינים הבאים הפריעו לך:"
    },
    { 
      outputType: "question",
      label: "זיכרונות טורדניים, חוזרים ולא רצויים של החוויה הטראומטית?", 
      controlName: "q1", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: " במידה מועטה", value: 1 },
        { label: "באופן בינוני", value: 2 },
        { label: "במידה רבה", value: 3 },
        { label: "באופן קיצוני", value: 4}
      ]
    },
    { 
      outputType: "question",
      label: "הרגשת מצוקה כאשר משהו הזכיר לך את החוויה הטראומטית?", 
      controlName: "q2", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: " במידה מועטה", value: 1 },
        { label: "באופן בינוני", value: 2 },
        { label: "במידה רבה", value: 3 },
        { label: "באופן קיצוני", value: 4}
      ]
    },
    { 
      outputType: "question",
      label: "הימנעות ממחשבות, רגשות או תחושות גופניות שהזכירו לך את החוויה הטראומטית, (כלומר גורמים מתוך עצמך ולא גורמים חיצוניים)?", 
      controlName: "q3", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: " במידה מועטה", value: 1 },
        { label: "באופן בינוני", value: 2 },
        { label: "במידה רבה", value: 3 },
        { label: "באופן קיצוני", value: 4}
      ]
    },
    { 
      outputType: "question",
      label: "הימנעות מגורמים חיצוניים שהזכירו לך את החוויה הטראומטית (כמו: אנשים, מקומות, שיחות, חפצים, פעילויות או מצבים)?", 
      controlName: "q4", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: " במידה מועטה", value: 1 },
        { label: "באופן בינוני", value: 2 },
        { label: "במידה רבה", value: 3 },
        { label: "באופן קיצוני", value: 4}
      ]
    },
    { 
      outputType: "question",
      label: "אמונות שליליות חזקות על עצמך, על אנשים אחרים, או על העולם? (למשל, אני אדם רע ת, משהו ממש לא בסדר איתי, אי אפשר לסמוך על אף אחד, העולם הוא מקום מסוכן לגמרי)", 
      controlName: "q5", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: " במידה מועטה", value: 1 },
        { label: "באופן בינוני", value: 2 },
        { label: "במידה רבה", value: 3 },
        { label: "באופן קיצוני", value: 4}
      ]
    },{ 
      outputType: "question",
      label: "אובדן עניין בפעילויות מהן נהגת ליהנות?", 
      controlName: "q6", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: " במידה מועטה", value: 1 },
        { label: "באופן בינוני", value: 2 },
        { label: "במידה רבה", value: 3 },
        { label: "באופן קיצוני", value: 4}
      ]
    },{ 
      outputType: "question",
      label: "הרגשה שאתה נוטה להיבהל בקלות או מאוד קופצני? ", 
      controlName: "q7", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: " במידה מועטה", value: 1 },
        { label: "באופן בינוני", value: 2 },
        { label: "במידה רבה", value: 3 },
        { label: "באופן קיצוני", value: 4}
      ]
    },{ 
      outputType: "question",
      label: "קשיים בריכוז?", 
      controlName: "q8", 
      type: "radio", 
      options: [
        { label: "כלל לא", value: 0},
        { label: " במידה מועטה", value: 1 },
        { label: "באופן בינוני", value: 2 },
        { label: "במידה רבה", value: 3 },
        { label: "באופן קיצוני", value: 4}
      ]
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
      { label: "כלל לא", value: 0},
      { label: " במידה מועטה", value: 1 },
      { label: "באופן בינוני", value: 2 },
      { label: "במידה רבה", value: 3 },
      { label: "באופן קיצוני", value: 4}
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
    this.http.post('https://tovademo.onrender.com/api/modify-user', [user, "PCL-5_results - "+today, {...this.conorForm.value, sum}])
    .subscribe(res => {
      // const response = JSON.stringify(res);
      console.log("response", res);
    });

    setTimeout(() => {
      this.router.navigate(['/stress-form'])
    }, 3000)
  }
}