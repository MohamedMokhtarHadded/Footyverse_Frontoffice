import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificaionService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getNotifications() {
    return this.http.get(`${this.baseUrl}/notification`);
  }

  getNotification(id: string) {
    return this.http.get(`${this.baseUrl}/notification/${id}`);
  }

  addNotification(notification: any) {
    return this.http.post(`${this.baseUrl}/notification/add`, notification);
  }

  setNotificationRead() {
    return this.http.post(`${this.baseUrl}/notification/set-as-read`, {});
  }

  getNotificationWithTitleInjury() {
    return this.http.get(`${this.baseUrl}/notification/title/Injury`);
  }

    getNotificationWithTitleTraining() {
    return this.http.get(`${this.baseUrl}/notification/title/Training`);
    }
}
