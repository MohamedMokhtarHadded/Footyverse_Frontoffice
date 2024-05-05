// news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/sports-headlines'; // Update URL based on your Express API endpoint

  constructor(private http: HttpClient) {}

  getSportsHeadlines(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        catchError(error => {
          throw 'Error in getting sports headlines: ' + error;
        })
      );
  }
}
