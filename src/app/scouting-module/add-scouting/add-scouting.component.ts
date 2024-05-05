import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router from '@angular/router'
import { ScoutingService } from 'src/app/services/scouting.service';
import { scouting } from 'src/models/scouting';

@Component({
  selector: 'app-add-scouting',
  templateUrl: './add-scouting.component.html',
styleUrls: ['./add-scouting.component.css']

})

export class AddScoutingComponent {
  scoutingForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private scoutingService: ScoutingService,
    private router: Router // Inject Router from '@angular/router'
  ) { }

  ngOnInit(): void {
    this.scoutingForm = this.formBuilder.group({
      rate: ['', Validators.required],
      playername: ['', Validators.required],
      weaknesses: ['', Validators.required],
      description: ['', Validators.required],
      potential: ['', Validators.required],
      power: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.scoutingService.addscouting(this.scoutingForm.value).subscribe(
      (scouting: scouting) => {
        console.log('Scouting added successfully:', scouting);
        this.scoutingForm.reset();
        alert('Scouting added successfully');
        this.navigateToListeScouting(); // Corrected function name
      },
      error => {
        console.error('Error fetching scoutings:', error);
      }
    );
  }

  navigateToListeScouting(): void {
    this.router.navigate(['scouting/view']); // Corrected navigation path
  }
}
