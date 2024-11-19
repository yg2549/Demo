import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private apiUrl = 'http://localhost:5001/api/get-data';

  constructor(private http: HttpClient) {}

  getResults(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getResultById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}

