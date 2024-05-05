import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { ExerciceService } from 'src/app/services/exercice.service';
import { NotificaionService } from 'src/app/services/notificaion.service';
import { PlayerService } from 'src/app/services/player.service';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/models/Exercise';
import { Player } from 'src/models/Player';
import { Training } from 'src/models/Training';



@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent {

  trainingForm!: FormGroup;
  playersForm!: FormGroup;
  selectedExercises: string[] = [];
  exercices: Exercise[] = [];
  players: any[] = [];
  checkedPlayers: any[] = [];
  training: Training = new Training();
  socket: any;



  constructor(private formBuilder: FormBuilder,
    private exerciceService: ExerciceService,
    private router: Router,
    private trainingService: TrainingService,
    private playerService: PlayerService,
    private notificationService: NotificaionService
  ) {

    this.playerService.getPlayers().subscribe(
      (data: any) => {
        this.players = data.players;
        console.log('Players:', this.players);
        this.players = this.players.map(player => ({ ...player, checked: false }));
      },
      (error) => {
        console.error('Error fetching players:', error);
      }
    );
  }

  ngOnInit(): void {
    this.socket = io('http://localhost:3002');


    this.exerciceService.getExercices().subscribe(
      (exercices: Exercise[]) => {
        this.exercices = exercices;
        console.log('Exercices:', this.exercices);
      },
      (error) => {
        console.error('Error fetching exercices:', error);
      }
    );


    this.trainingForm = this.formBuilder.group({
      date: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(0)]],
      trainingType: ['', Validators.required],
      exercises: [[]],
      notes: ['']
    });

  }

  getCheckedPlayers() {
    console.log('checkedPlayers:', this.checkedPlayers);
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players.map(player => ({ ...player, checked: false }));
    });
  }

  togglePlayerChecked(player: any) {
    player.checked = !player.checked;
    this.updateCheckedPlayers();
  }

  updateCheckedPlayers() {
    this.checkedPlayers = this.players.filter(player => player.checked);
  }

  onSubmit() {
    if (this.trainingForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }

    this.training = this.trainingForm.value;
    this.training.player = this.checkedPlayers.map(player => player._id);



    this.trainingService.addTraining(this.training).subscribe(
      (training : any) => {
        console.log('Training form:', this.trainingForm.value);
        console.log('Training added successfully:', training);

        alert('Training added successfully');

        for (let player of this.training.player) {
          this.notificationService.addNotification({
            message: "You have a new training scheduled on " + this.training.date,
            date: new Date(),
            player: player,
            status: 'unread',
            title: "Training",
          }).subscribe(
            (notification) => {
              console.log('Notification added:', notification);
            }
          );
          break;
        }

        console.log('TrainingID:', training.training._id);
        this.socket?.emit('add-training', training.training._id);
        
        this.router.navigate(['/training/manageTrainings']);
      },
      (error) => {
        console.error('Error adding training:', error);
        alert('Error adding training');
      }
    );
  }

}
