import { Component, Input, numberAttribute, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { DbService } from '../../db.service';
import { AuthService } from '../../auth.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import questions from '../../../../assets/questions.json';
import answers from '../../../../assets/answers.json';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HelpersService } from '../../helpers.service';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raw-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './raw-table.component.html',
  styleUrl: './raw-table.component.css'
})
export class RawTableComponent extends BaseTableComponent<{
  set: string;
  question: string;
  answer: string;
}> implements OnInit{
  participant!: string;

  constructor(
    private dbService: DbService,
    private authService: AuthService,
    private helpersService: HelpersService,
    private route: ActivatedRoute
  ) {
    super()
  }
  @Input() id = '';

  override ngOnInit(): void {
    this.displayedColumns = ['set', 'question', 'answer']
    this.participant = this.id.substring(1);
    console.log(this.route.snapshot.params['id'])
    this.loadData()
  }

  loadData(): void {
    this.dbService.getParticipant(this.participant).subscribe((data) => {
            this.dataSource.data = this.formatData(data)
    });
  }
  override formatData(
    data: {
    intro_results: { gender: string; wellbeing: string };
    conor_results: { [key: string]: string };
    stress_results: { [key: string]: string };
    conclusion_results: { [key: string]: string };
  }): { set: string; question: string; answer: string }[] {
    const formatted_data: { set: string; question: string; answer: string }[] = []
    
    Object.entries(data).forEach(([questionSet, answerSet]) => {
      const questionAnswerPairs: {set: string, question: string, answer: string}[] = []
      if(questionSet === "conor_results"){
        Object.entries(answerSet as Record<string, string>).forEach(([questionCode, answerCode]) => {
          const question = this.helpersService.conor_questions[questionCode] ?? "Unknown Question";
          const answer = this.helpersService.conor_options[answerCode] ?? "Unknown Answer";
          formatted_data.push({set: questionSet, question: question, answer: answer});
        });
      }
      else if(questionSet === "stress_results"){
        Object.entries(answerSet as Record<string, string>).forEach(([questionCode, answerCode]) => {
          const question = this.helpersService.stress_questions[questionCode];
          let answer = this.helpersService.stress_options["regular"][answerCode];
          if(questionCode === "q4" ||questionCode === "q5" || questionCode === "q6" || questionCode === "q7" || questionCode === "q9" || questionCode === "q10" || questionCode === "q13"){
            answer = this.helpersService.stress_options["flipped"][answerCode]
          }
          formatted_data.push({set: questionSet, question: question, answer: answer});
        });
      }
      else if(questionSet === "conclusion_results"){
        Object.entries(answerSet as Record<string, string>).forEach(([questionCode, answerCode]) => {
          const question = this.helpersService.conclusion_questions[questionCode] ?? "Unknown Question";
          const answer = this.helpersService.conclusion_options[answerCode] ?? data[questionSet]["additional comments"];
          formatted_data.push({set: questionSet, question: question, answer: answer});
        });
      }
      else if(questionSet === "intro_results"){
        Object.entries(answerSet as Record<string, string>).forEach(([questionCode, answerCode]) => {
          const question = this.helpersService.intro_questions[questionCode] ?? "Unknown Question";
          const answer = this.helpersService.intro_options[answerCode] ?? data[questionSet]["wellbeing"];
          formatted_data.push({set: questionSet, question: question, answer: answer});
        });
      }
    });
    return formatted_data;
  }

}
