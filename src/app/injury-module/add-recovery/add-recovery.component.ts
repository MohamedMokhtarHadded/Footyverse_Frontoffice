import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryService } from 'src/app/services/recovery.service';
import { Player } from 'src/models/Player';
import { Recovery } from 'src/models/Recovery';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-recovery',
  templateUrl: './add-recovery.component.html',
  styleUrls: ['./add-recovery.component.css']
})
export class AddRecoveryComponent {
  
  addRecoveryForm!: FormGroup;
  alertMessage: string = "";
  alertType: string = "";
  showAlert: boolean = false;
  players: Player[] = [];
  params: any;

  constructor(private formBuilder: FormBuilder,
    private recoveryService: RecoveryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Params:', params);
        this.params = params;
      }
    );

    this.addRecoveryForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activities: ['', Validators.required],
    });

   
  }

  onSubmit(): void {
    if (this.addRecoveryForm.invalid) {
      this.openSnackBar('Erreur!', 'alertDanger');
      const closebtn = document.getElementById('closeBtn');
      closebtn?.click();
    }

    else {
      const recovery: Recovery = this.addRecoveryForm.value;
      recovery.player = this.params.playerId;
      recovery.injury = this.params.injuryId;

      this.recoveryService.addRecovery(recovery).subscribe(
        (recovery: Recovery) => {
          console.log('Recovery:', recovery);

          this.openSnackBar('Recovery added successfully!', 'alertSuccess');
          const closebtn = document.getElementById('closeBtn');
          closebtn?.click();

          this.router.navigate(['/injury/view-recovery-plans']);
        },
        (error) => {
          console.log('Error:', error);
          this.openSnackBar('Error adding recovery. Please try again.', 'alertDanger');
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
