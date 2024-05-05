import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from 'src/app/services/exercice.service';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/models/Training';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css']
})
export class EditTrainingComponent   implements OnInit {

  id!: string;
  training!: Training;
  trainingForm!: FormGroup;
exercices: any;

  constructor(
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private exerciceService: ExerciceService,
    private router: Router
 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.exerciceService.getExercices().subscribe(
      (exercices: any) => {
        this.exercices = exercices;
        console.log('Exercices:', this.exercices);
      },
      (error) => {
        console.error('Error fetching exercices:', error);
      }
    );

    
    this.trainingService.getTraining(this.id).subscribe(
      (training: Training) => {
        console.log('Training fetched successfully:', training);
        this.training = training;
        this.initializeForm();
      }
    );
  }

  initializeForm() {
    this.trainingForm = this.formBuilder.group({
      date: [new Date(this.training.date), Validators.required],
      duration: [this.training.duration, Validators.required],
      trainingType: [this.training.trainingType, Validators.required],
      exercises: [this.training.exercises, Validators.required],
      notes: [this.training.notes, Validators.required]
    });
  }

  onSubmit(): void {
    this.trainingForm.value._id = this.id;
    console.log(this.trainingForm.value);
    this.trainingService.updateTraining(this.trainingForm.value).subscribe(
      (training: Training) => {
        console.log('Training updated successfully:', training);
        console.log(this.trainingForm.value);
        alert('Training updated successfully');
        this.router.navigate(['/training/manageTrainings']);


       
      },
      error => {
        console.error('Error updating training:', error);
      }
    );
  }
}