import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { DbService } from '../../db.service';
import { AuthService } from '../../auth.service';
import { HelpersService } from '../../helpers.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
    NgIf],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends BaseTableComponent<{
  id: string;
  date: string;
  conor: number;
  stress: number;
  danger: string;
  link: string;
}> implements OnInit {


  constructor(
    private dbService: DbService,
    private authService: AuthService,
    private helpersService: HelpersService
  ) {
    super()
  }

  override ngOnInit(): void {
    this.displayedColumns = ['participant', 'date', 'conor', 'stress', 'danger', 'link']
    this.loadData();
  }


  loadData(): void {
    const site = this.authService.getselectedSite();
    if (!site) {
      alert('No site selected. Please log in again.');
      return;
    }
    this.dbService.getParticipantsBySite(site).subscribe((data: { total: any; }) => {
      this.dataSource.data = this.formatData(data)
      // this.setData(dataToPass);
    });
  }

  override formatData(data: any): { id: string; date: string; conor: number; stress: number; danger: string; link: string }[] {
    return data.map((participant: any) => ({
      participant: participant.user,
      date: participant.date,
      conor: this.helpersService.calculateConor(participant.conor_results),
      stress: this.helpersService.calculateStress(participant.stress_results),
      danger: this.helpersService.calculateDanger(
        this.helpersService.calculateConor(participant.conor_results),
        this.helpersService.calculateStress(participant.stress_results)
      ),
      link: participant.user,
    }));
  }
}


// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { DbService } from '../../db.service';
// import { NgForOf, NgIf } from '@angular/common';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatTableDataSource } from '@angular/material/table';
// import { AuthService } from '../../auth.service';
// import { HelpersService } from '../../helpers.service';

// @Component({
//   selector: 'app-table',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatFormFieldModule,
//     MatInputModule,
//     NgIf
//   ],
//   templateUrl: './table.component.html',
//   styleUrl: './table.component.css'
// })

// export class TableComponent implements OnInit{
//   displayedColumns: string[] = ['participant', 'date', 'conor', 'stress', 'danger', 'link'];
//   dataSource = new MatTableDataSource<{ id: string; date: string; conor: number; stress: number; danger: string; link: string }>([]);
//   totalRecords = 0;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private dbService: DbService,
//     private authService: AuthService,
//     private helpersService: HelpersService 
//   ) {}

//   ngOnInit(): void {
//     this.loadData()
//   }

//   loadData(): void {
//     const site = this.authService.getselectedSite(); // Get selected site from AuthService

//     if (!site) {
//       alert('No site selected. Please log in again.');
//       return;
//     }
//     this.dbService.getParticipantsBySite(site).subscribe((data) => {
//       const formattedData = this.formatData(data)
//       this.dataSource.data = formattedData;
//       this.totalRecords = data.total;
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//     });
//   }

//   formatData(data: []): { id: string; date: string; conor: number; stress: number; danger: string, link: string }[] {
//     const formatted_data: { id: string; date: string; conor: number; stress: number; danger: string, link: string }[] = []
//     for (let item in data){
//       const participant = data[item];
//       const conorScore = this.helpersService.calculateConor(participant['conor_results']);
//       const stressScore = this.helpersService.calculateStress(participant['stress_results']);
//       const danger = this.helpersService.calculateDanger(conorScore, stressScore);
//       const participant_data = {
//         id: participant['user'],
//         date: participant['date'],
//         conor: conorScore,
//         stress: stressScore,
//         danger: danger,
//         link: participant['user']
//       }
//       formatted_data.push(participant_data)
//       // console.log(participant)
//     }
//     return formatted_data
//   }

//   applyFilter(event: Event): void {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }
// }