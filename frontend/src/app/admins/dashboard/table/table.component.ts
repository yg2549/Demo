import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../db.service';
import { NgForOf, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-table',
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
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit{
  displayedColumns: string[] = ['participant', 'date', 'conor', 'stress', 'danger', 'link'];
  dataSource = new MatTableDataSource<{ id: string; date: string; conor: number; stress: number; danger: string; link: string }>([]);
  totalRecords = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dbService: DbService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    const site = this.authService.getselectedSite(); // Get selected site from AuthService

    if (!site) {
      alert('No site selected. Please log in again.');
      return;
    }
    this.dbService.getParticipantsBySite(site).subscribe((data) => {
      const formattedData = this.formatData(data)
      this.dataSource.data = formattedData;
      this.totalRecords = data.total;  // Adjust based on your API structure
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }

  formatData(data: []): { id: string; date: string; conor: number; stress: number; danger: string, link: string }[] {
    const formatted_data: { id: string; date: string; conor: number; stress: number; danger: string, link: string }[] = []
    for (let item in data){
      const participant = data[item];
      const conorScore = this.calculateConor(participant['conor_results']);
      const stressScore = this.calculateStress(participant['stress_results']);
      const danger = this.calculateDanger(conorScore, stressScore);
      const participant_data = {
        id: participant['user'],
        date: participant['date'],
        conor: conorScore,
        stress: stressScore,
        danger: danger,
        link: participant['user']
      }
      formatted_data.push(participant_data)
      // console.log(participant)
    }
    return formatted_data
  }

  calculateConor(data: []): number{
    let total = 0;

    for(let question in data){
      total += data[question]
    }

    return total;
  }
  calculateStress(data: []): number{
    let total = 0;
    const flipped = {
      0:4,
      1:3,
      2:2,
      3:1,
      4:0
    }

    for(let question in data){
      const q_number: number = +question.substring(1)
      if (q_number == 4 || q_number == 5 || q_number == 6 || q_number == 7 || q_number == 9 || q_number == 10 || q_number == 13){
        total += flipped[data[question]]
      }
      else{
        total += data[question]
      }
    }

    return total;
  }
  calculateDanger(conor: number, stress: number): string{
    if(conor > 30 || stress > 45){
      return "yes"
    }
    return "no"
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}