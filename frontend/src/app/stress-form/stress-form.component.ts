import { NgIf, NgSwitchCase, NgSwitch, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-stress-form', // Replace with your actual component selector
  templateUrl: './stress-form.component.html', // Replace with your actual template URL
  styleUrls: ['./stress-form.component.css'], // Replace with your actual styles URL
  imports: [ReactiveFormsModule, NgIf, NgSwitchCase, NgSwitch, NgForOf]
})
export class StressFormComponent implements OnInit {
  conorForm: FormGroup;
  intro = "";
  conclusion = ".בהחלט תקופה מאתגרת, חשוב מאד שאת משתפת ומקדישה זמן לעצמך";
  questions = [
    { 
      label: "?בחודש האחרון, באיזו מידה היית 'מעוצבנ.ת' בגלל משהו שקרה באופן בלתי צפוי", 
      controlName: "q1", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]   
    },
    { 
      label: "?בחודש האחרון, באיזו מידה הרגשת חוסר שליטה בדברים החשובים בחייך", 
      controlName: "q2", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]   
    },
    { 
      label:"?'בחודש האחרון, באיזו מידה הרגשת עצבני/ת ו'לחוצ.ה", 
      controlName: "q3", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]
    },
    { 
      label: "?בחודש האחרון, באיזו מידה טיפלת בהצלחה במטרדים מרגיזים", 
      controlName: "q4", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]
    },
    { 
      label: "?בחודש האחרון, באיזו מידה הרגשת שאת/ה מתמודד.ת ביעילות עם שינויים חשובים בחייך", 
      controlName: "q5", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]
    },
    { 
      label: "?בחודש האחרון, באיזו מידה הרגשת בטחון ביכולתך לטפל בבעיותיך האישיות", 
      controlName: "q6", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ] 
    },
    { 
      label: "?בחודש האחרון, באיזו מידה הרגשת שהדברים מתפתחים בהתאם לרצונך", 
      controlName: "q7", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]   
    },
    { 
      label: "?בחודש האחרון, באיזו מידה יכולת להתמודד עם כל הדברים שהיה עליך לעשות", 
      controlName: "q8", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ] 
    },
    { 
      label: "?בחודש האחרון, באיזו מידה יכולת לשלוט בדברים המרגיזים אותך", 
      controlName: "q9", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ] 
    },
    { 
      label: "?בחודש האחרון, באיזו מידה הרגשת שאת שולט.ת במצב", 
      controlName: "q10", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ] 
    },
    { 
      label: "?בחודש האחרון, באיזו מידה התרגזת בגלל אירועים שהיו מחוץ לשליטתך", 
      controlName: "q11", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]
    },
    { 
      label: "?בחודש האחרון, באיזו מידה הטרידו אותך מחשבות על דברים שהיה עליך להשלים", 
      controlName: "q12", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]  
    },
    { 
      label: "?בחודש האחרון, באיזו מידה יכולת לשלוט בדרך שבה את/ה מנצל.ת את זמנך", 
      controlName: "q13", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]  
    },
    { 
      label: "?בחודש האחרון, באיזו מידה הרגשת שהקשיים מצטברים עד כדי כך שלא יכולת להתגבר עליהם", 
      controlName: "q14", 
      type: "radio", 
      options: [
        { label: "כמעט אף פעם", value: 0},
        { label: "לעיתים רחוקות", value: 1 },
        { label: "לפעמים", value: 2 },
        { label: "לעיתים קרובות", value: 3 },
        { label: "לעיתים קרובות מאד", value: 4}
      ]  
    },
  
  ]
  currentQuestionIndex = 0;
  showAnswers = false;

  constructor(private fb: FormBuilder) {
    this.conorForm = this.fb.group({});
    this.questions.forEach(question => {
      this.conorForm.addControl(question.controlName, this.fb.control(''));
    });
  }

  ngOnInit() {
    // Show answer options for the first question after a short delay
    this.showQuestionWithDelay();
  }

  showQuestionWithDelay() {
    this.showAnswers = false; // Hide options initially
    setTimeout(() => {
      this.showAnswers = true; // Show options after delay
    }, 500); // Adjust delay time (in milliseconds) as needed
  }

  onAnswerSelected() {
    const controlName = this.questions[this.currentQuestionIndex].controlName;
    const value = this.conorForm.get(controlName)?.value;

    // Automatically move to the next question if an answer is selected
    if (value !== undefined) {
      this.moveToNextQuestion();
    }
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.showQuestionWithDelay(); // Show next question with a delay for answer options
    } else {
      this.onSubmit(); // Automatically submit when the last question is answered
    }
  }

  onSubmit() {
    console.log("Form submitted:", this.conorForm.value);
  }
}