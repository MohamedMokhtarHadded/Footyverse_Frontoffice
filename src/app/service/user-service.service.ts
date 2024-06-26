import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public connetedUser!: User | null;

  SERVER_URL: string = "https://footyverse-backend.onrender.com/user";
  constructor(private httpClient: HttpClient) { }


  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.SERVER_URL}/register`, user);
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.SERVER_URL}/login`, user).pipe(
      map((userData: any) => {
        localStorage.setItem('access_token', userData.access_token);
        this.connetedUser = userData;
        return userData;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.connetedUser = null;
  }


  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.SERVER_URL}/users`);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.SERVER_URL}/${id}`);
  }

  validateToken(): Observable<any> {
    return this.httpClient.get<any>(`${this.SERVER_URL}/token`);
  }

  forgetPassword(email:any): Observable<any> {
    const body={"email":email}
    return this.httpClient.post<any>(`${this.SERVER_URL}/forgetpwd`,body);
  }
  
  resetToken(token : any , newPassword: any): Observable<any> {
    const body={"token":token, "newPassword":newPassword}
    return this.httpClient.post<any>(`${this.SERVER_URL}/resetpwd`,body);
  }
}
