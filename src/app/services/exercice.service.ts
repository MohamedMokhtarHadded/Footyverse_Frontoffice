import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from 'src/models/Exercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
  
  private baseUrl = 'http://localhost:3000/exercise';

  constructor(private http: HttpClient) { }

  getExercices(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl);
 }

  getExercice(id: string): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.baseUrl}/${id}`);
  }

  addExercice(exercice: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.baseUrl}`, exercice);
  }

  updateExercice(exercice: Exercise): Observable<Exercise> {
    return this.http.patch<Exercise>(`${this.baseUrl}/${exercice._id}`, exercice);
  }

  deleteExercice(id: string): Observable<Exercise> {
    return this.http.delete<Exercise>(`${this.baseUrl}/${id}`);
  }
}
