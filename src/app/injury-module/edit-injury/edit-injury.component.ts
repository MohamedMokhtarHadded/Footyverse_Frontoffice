import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/models/Injury';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-injury',
  templateUrl: './edit-injury.component.html',
  styleUrls: ['./edit-injury.component.css']
})
export class EditInjuryComponent {
  id!: string;
  injury!: Injury;
  injuryForm: FormGroup  = this.formBuilder.group({
    injuryType: [""],
    description: [""],
    treatment: [""],
    diagnosis: [""],
    doctor: [""],
    time: [""],
    returnDate: [""]
  });;

  alertMessage: string ="";
  alertType: string="";
  showAlert: boolean = false;

  constructor(private formBuilder: FormBuilder,
     private injuryService: InjuryService,
     private route: ActivatedRoute,
     private router: Router,
     private location: Location,
     private _snackBar: MatSnackBar
      ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.injuryService.getInjury(this.id).subscribe(
      (injury: Injury) => {
        console.log('Injury fetched successfully:', injury);
        this.injury = injury;
        
        this.initializeForm();
      });
  }

  initializeForm() {
    this.injuryForm = this.formBuilder.group({
      injuryType: [this.injury.injuryType, Validators.required],
      description: [this.injury.description, Validators.required],
      treatment: [this.injury.treatment, Validators.required],
      diagnosis: [this.injury.diagnosis, Validators.required],
      doctor: [this.injury.doctor, Validators.required],
      time: [this.injury.time, Validators.required],
      returnDate: [new Date(this.injury.returnDate), Validators.required]
    });
  }


  onSubmit(): void {
    if (this.injuryForm.invalid) {
      this.openSnackBar('Please check your fields!', 'alertDanger');
      const closebtn = document.getElementById('closeBtn');
      closebtn?.click();
    }

    else {

    this.injuryForm.value._id = this.id;
    console.log(this.injuryForm.value);
    this.injuryService.updateInjury(this.injuryForm.value).subscribe(
      (injury: Injury) => {
        console.log('Injury updated successfully:', injury);
        console.log(this.injuryForm.value);
        this.openSnackBar('Injury updated successfully!', 'alertSuccess');
        this.location.back();    

        const closebtn = document.getElementById('closeBtn');
        closebtn?.click();
    
      },
      error => {
        console.error('Error updating injury:', error);
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
      this._snackBar.open(message , 'Close', {
        duration: 2000,
        panelClass: ['alertDanger']
      });
  }
}
