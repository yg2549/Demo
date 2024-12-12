import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../db.service';
import { NgForOf, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';
import { HelpersService } from '../helpers.service';

@Component({
  selector: 'app-base-table',
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
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.css'
})

export abstract class BaseTableComponent<T> implements OnInit{
  protected displayedColumns: string[] = [];
  protected dataSource = new MatTableDataSource<{}>([]);
  protected totalRecords = 0;
  // totalRecords = 0;
  // dataToLoad: []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
 * Optionally override this method in derived classes to process data.
 */
  formatData(data: any): any[] {
    return data;
  }

  /**
   * Load data logic to be implemented in derived classes.
   */
  abstract loadData(): void;

  setData(data: any): void {
    this.dataSource.data = data;
  }
}