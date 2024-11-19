import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private apiUrl = 'http://localhost:5001/api'; // Your Flask API URL

  constructor(private http: HttpClient) {}

  // Fetch participant data based on the selected site
  getParticipantsBySite(site: string): Observable<any> {
    const url = `${this.apiUrl}/get-site-data?site=${site}`; // Pass the site as a query parameter
    return this.http.get<any>(url); // Make the GET request to the backend API
  }
  getParticipant(participant: string): Observable<any> {
    const url = `${this.apiUrl}/get-participant-data?participant=${participant}`;
    return this.http.get<any>(url)
  }
}


