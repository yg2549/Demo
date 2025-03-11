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
      outputType: "question",
      label: "עוד משהו שתרצ.י לשתף?", 
      controlName: "q1", 
      type: "text", 
      
    },
    {
      outputType: "statement",
      content: "מעולה, סיימנו, תודה רבה"
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
        if(currentItem.type == 'text'){
          this.showAnswers2 = true; // Show answers after delay
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
      { label: "נכון כמעט כל הזמן", value: 4}
    ]
    return options[value].label;
      
  }




  onSubmit(){
    const user = sessionStorage['user'];
    const gender = this.conclusionForm.value['gender'];
    sessionStorage.setItem('gender', gender);
    console.log(this.conclusionForm.value)
    const today = new Date().toLocaleDateString('en-GB');
    this.http.post('https://tovademo.onrender.com/api/modify-user', [user, "conclusion_results - "+today, this.conclusionForm.value])
      .subscribe(res => {
        // const response = JSON.stringify(res);
        console.log("response", res);
      });
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 3000)
  }
}