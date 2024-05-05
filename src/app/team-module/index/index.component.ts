import { Component } from '@angular/core';
import io from 'socket.io-client';
import { NotificaionService } from 'src/app/services/notificaion.service';
import { Notification } from 'src/models/notification';
import { User } from 'src/models/User';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  socket: any;
  messages: Notification[] = [];
  nmbUnreadNotifications: number = 0;
  connectedUser!: User;

  trainingMessages: Notification[] = [];
  nbmUnreadTrainingNotifications: number = 0;

  constructor(
    private notification: NotificaionService
  ) { }

  ngOnInit() {
    this.connectedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    console.log('User:', this.connectedUser);

    this.socket = io('http://localhost:3002'); 

    this.socket.on('injuryAdded', (data: any) => {
      this.nmbUnreadNotifications++;
      
      this.notification.getNotificationWithTitleInjury().subscribe(
        (data: any) => {
          this.messages = data;
          console.log('Notifications:', this.messages);
        }
      );
    });


    this.socket.on('trainingAdded', (data: any) => {
      this.nbmUnreadTrainingNotifications++;

      this.notification.getNotificationWithTitleTraining().subscribe(
        (data: any) => {
          this.trainingMessages = data;
          console.log('Training notifications:', this.trainingMessages);
        }
      );
    });


    this.notification.getNotificationWithTitleInjury().subscribe(
      (data: any) => {
        
        // this.nmbUnreadNotifications = data.notifications.length;
        this.messages = data;
        console.log('Notifications:', this.messages);
        console.log('Number of unread notifications:', this.nmbUnreadNotifications);

        this.messages.map((message : Notification) => {
          if (message.status === "unread") {
            this.nmbUnreadNotifications++;
          }
        });
      }
    );

    this.notification.getNotificationWithTitleTraining().subscribe(
      (data: any) => {
        this.trainingMessages = data;
        console.log('Training notifications:', this.trainingMessages);
        console.log('Number of unread training notifications:', this.nbmUnreadTrainingNotifications);
        this.trainingMessages.map((message : Notification) => {
          if (message.status === "unread") {
            this.nbmUnreadTrainingNotifications++;
          }
        });
      }
    );

  }

  resetNewNotifications() {
    this.nmbUnreadNotifications = 0;
    this.nbmUnreadTrainingNotifications = 0;
    this.notification.setNotificationRead().subscribe(
      (data: any) => {
        console.log('Notifications set as reisad:', data);
      }
    );
  }

}
