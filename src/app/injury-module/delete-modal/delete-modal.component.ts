import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InjuryService } from 'src/app/services/injury.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  id!: string;
  alertMessage!: string;
  alertType!: string;
  showAlert!: boolean;

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private injuryService: InjuryService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.id = this.data.id;
    console.log('Data:', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {

    try{
    this.injuryService.deleteInjury(this.id).subscribe(
      (response: any) => {
        console.log('Injury deleted successfully:', response);
      },
      error => {
        console.error('Error deleting injury:', error);
      }
    );

    this.dialogRef.close(true);
    this.openSnackBar('Injury deleted successfully!', 'alertSuccess');

  }
    catch(error){
      console.error('Error deleting injury:', error);
      this.openSnackBar('Error deleting injury!', 'alertDanger');
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
  openSnackBar(message: string, className: string) {
    this._snackBar.open(message , 'Close', {
      duration: 2000,
      panelClass: ['alertDanger']
    });
}

}
