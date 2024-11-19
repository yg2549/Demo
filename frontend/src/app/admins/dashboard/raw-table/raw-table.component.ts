import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { DbService } from '../../db.service';
import { AuthService } from '../../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-raw-table',
  standalone: true,
  imports: [],
  templateUrl: './raw-table.component.html',
  styleUrl: './raw-table.component.css'
})
export class RawTableComponent implements OnInit{
  displayedColumns: string[] = ['set', 'question', 'answer'];
  dataSource = new MatTableDataSource<{ id: string; date: string; conor: number; stress: number; danger: string; link: string }>([]);
  totalRecords = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dbService: DbService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData("1051")
  }

  loadData(participant: string): void {
    this.dbService.getParticipant(participant).subscribe((data) => {
      console.log(data)
      const formattedData = this.formatData(data)
      // this.dataSource.data = formattedData;
      // this.totalRecords = data.total;
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }
  formatData(data: {}): {}{
    return {};
  }
}
