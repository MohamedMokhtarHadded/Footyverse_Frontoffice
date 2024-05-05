import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/models/Injury';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from 'src/models/Player';
import { PlayerService } from 'src/app/services/player.service';
import io from 'socket.io-client';
import { NotificaionService } from 'src/app/services/notificaion.service';




@Component({
  selector: 'app-add-injury',
  templateUrl: './add-injury.component.html',
  styleUrls: ['./add-injury.component.css']
})
export class AddInjuryComponent {
  injuryForm!: FormGroup;
  alertMessage: string = "";
  alertType: string = "";
  showAlert: boolean = false;
  players: Player[] = [];
  socket: any;

  constructor(private formBuilder: FormBuilder,
    private injuryService: InjuryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _snackBar: MatSnackBar,
    private playerService: PlayerService,
    private notificationService: NotificaionService
  ) { }

  ngOnInit(): void {

    this.socket = io('http://localhost:3002');


    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Params:', params);
      }
    );

    this.playerService.getPlayers().subscribe(
      (data: any) => {
        this.players = data.players;

        console.log('Players:', this.players);
      }
    );

    this.injuryForm = this.formBuilder.group({
      player: ['', Validators.required],
      date: ['', Validators.required],
      injuryType: ['', Validators.required],
      description: ['', Validators.required],
      treatment: ['', Validators.required],
      diagnosis: ['', Validators.required],
      doctor: ['', Validators.required],
      /* time: ['', Validators.required],
      returnDate: ['', Validators.required] */
    });

    this.injuryService.getInjuryPrediction('Back injury').subscribe(
      (prediction) => {
        console.log('Prediction:', Math.floor(prediction.predicted_injury_duration));
      }
    );
  }

  onSubmit(): void {
    if (this.injuryForm.invalid) {
      this.openSnackBar('Erreur!', 'alertDanger');
      const closebtn = document.getElementById('closeBtn');
      closebtn?.click();
    }

    else {
      const injury: Injury = this.injuryForm.value;

      this.injuryService.getInjuryPrediction(injury.injuryType).subscribe(
        (prediction) => {
          const predictedDurationMilliseconds = Math.floor(prediction.predicted_injury_duration * 24 * 60 * 60 * 1000);
          const injuryDate = new Date(injury.date);
          const returnDate = new Date(injuryDate.getTime() + predictedDurationMilliseconds);
          injury.returnDate = returnDate.toString();
          injury.time = Math.floor(prediction.predicted_injury_duration);

          // Now add the injury to the service
          this.injuryService.addInjury(injury).subscribe(
            (injury: Injury) => {
              // injury.player = "60b57d17b029d43784551c22";
              // this.injuryForm.reset();
              this.openSnackBar('Injury added successfully!', 'alertSuccess');
              this.location.back();

              const closebtn = document.getElementById('closeBtn');
              closebtn?.click();

              this.notificationService.addNotification({
                message: injury.injuryType,
                date: new Date(),
                player: injury.player,
                status: 'unread',
                title: 'Injury',
                dataId : injury._id,
              }).subscribe(
                (notification) => {
                  console.log('Notification added:', notification);
                }
              );

              this.socket?.emit('add-injury', injury._id);
              this.socket?.on('add-notification', (injury: Injury) => {
                console.log('Notification:', injury);
              });
            },
            (error) => {
              console.log('Error:', error);
              this.openSnackBar('Error adding injury. Please try again.', 'alertDanger');
            }
          );
        }
      );
    }
  }


  showSuccessAlert(): void {
    this.alertMessage = "Injury added successfully!";
    this.alertType = "success";
    this.showAlert = true;
  }

  showErrorAlert(): void {
    this.alertMessage = "Error adding injury. Please try again.";
    this.alertType = "error";
    this.showAlert = true;
  }

  hideAlert(): void {
    this.showAlert = false;
  }

  openSnackBar(message: string, className: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: ['alertDanger']
    });
  }
}