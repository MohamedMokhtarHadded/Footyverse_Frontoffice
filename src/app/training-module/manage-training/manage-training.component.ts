import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/models/Training';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-manage-training',
  templateUrl: './manage-training.component.html',
  styleUrls: ['./manage-training.component.css']
})
export class ManageTrainingComponent implements OnInit {
  trainings: Training[] = [];
  filteredTrainings: Training[] = [];
  selectedOption: string = '';
  searchText: string = '';
  searchForm: FormGroup | undefined;


  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.trainingService.getTrainings().subscribe(
      (trainings: Training[]) => {
        console.log('Trainings fetched successfully:', trainings);
        this.trainings = trainings;
        this.filteredTrainings = trainings;
      },
      error => {
        console.error('Error fetching trainings:', error);
      }
    );
    localStorage.setItem('role', 'trainer');
  }

  deleteTraining(_id: string) {
    console.log('Deleting training:', _id);
    this.trainingService.deleteTraining(_id).subscribe(
      (response: any) => {
        console.log('Training deleted successfully:', response);
        this.trainings = this.trainings.filter(training => training._id !== _id);
        this.filteredTrainings = this.filteredTrainings.filter(training => training._id !== _id);
        alert('Training deleted successfully');
      },
      error => {
        console.error('Error deleting training:', error);
      }
    );
  }

  editTraining(_id: string) {
    this.router.navigate(['/training/editTraining', _id]);
  }

  viewTraining(_id: string) {
    this.router.navigate(['/training/viewTraining', _id]);
  }

  isReturnDateBeforeCurrentDate(dateString: string): boolean {
    const returnDate = new Date(dateString);
    const currentDate = new Date();
    return returnDate < currentDate;
  }

  filterTrainings() {
    console.log("selectedOption: ", this.selectedOption);
    if (this.selectedOption === 'Physical Training') {
      this.filteredTrainings = this.trainings.filter(training => training.trainingType === 'Physical Training');
      console.log("filteredTrainings: ", this.filteredTrainings);
    } else if (this.selectedOption === 'Tactical Training') {
      this.filteredTrainings = this.trainings.filter(training => training.trainingType === 'Tactical Training');
    } else if (this.selectedOption === 'Technical Training') {
      this.filteredTrainings = this.trainings.filter(training => training.trainingType === 'Technical Training');
    } else if (this.selectedOption === 'Goalkeeper Training') {
      this.filteredTrainings = this.trainings.filter(training => training.trainingType === 'Goalkeeper Training');
    } else {
      this.filteredTrainings = this.trainings;
    }
    this.applyFilter();
  }

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    if (filterValue) {
      this.filteredTrainings = this.filteredTrainings.filter(training =>
        Object.values(training).some(value =>
          value.toString().toLowerCase().includes(filterValue)
        )
      );
    }
  }
}