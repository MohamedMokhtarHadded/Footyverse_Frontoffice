import { Injectable } from '@angular/core';
import { Router, CanActivate, } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

constructor(private router:Router) {}

setToken(token: string): void {
  localStorage.setItem('token', token);
}

getToken(): string | null {
  return localStorage.getItem('token');
}

isLoggedIn() {
  return this.getToken() !== null;
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['login']);
}

login({ email, password }: any): Observable<any> {
  if (email === 'admin@gmail.com' && password === 'admin123') {
    this.setToken('abcdefghijklmnopqrstuvwxyz');
    return of({ name: 'ichrak ben challadia', email: 'admin@gmail.com' });
  }
  return throwError(new Error('Failed to login'));
}
}