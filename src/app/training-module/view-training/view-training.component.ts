import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/models/Training';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.css']
})
export class ViewTrainingComponent {
training!:Training;


constructor(private trainingService: TrainingService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) { }
ngOnInit(): void {
  this.activatedRoute.params.subscribe(
    (params) => {
      console.log('Params:', params['id']);

      this.trainingService.getTraining(params['id']).subscribe(
        (training: any) => {
          console.log('Training fetched successfully:', training);
          this.training = training;
        }
      );
    }
  );
}
goBack() {
  this.location.back();
}
editTraining() {
  this.router.navigate(['/training/editTraining', this.training._id]);
}

} 

