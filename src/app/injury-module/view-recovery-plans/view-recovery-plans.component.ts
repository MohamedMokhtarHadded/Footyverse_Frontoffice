import { Component } from '@angular/core';
import { RecoveryService } from 'src/app/services/recovery.service';
import { Recovery } from 'src/models/Recovery';

@Component({
  selector: 'app-view-recovery-plans',
  templateUrl: './view-recovery-plans.component.html',
  styleUrls: ['./view-recovery-plans.component.css']
})
export class ViewRecoveryPlansComponent {

  recoveries: Recovery[] = [];

  constructor(
    private recoveryService: RecoveryService
  ) { }

  ngOnInit(): void {
    this.recoveryService.getRecoveryList().subscribe(
      (data: any) => {
        this.recoveries = data;
        console.log('Recoveries:', this.recoveries);
      }
    );
  }

  deleteRecoveryPlan(_id: string): void {
    this.recoveryService.deleteRecovery(_id).subscribe(
      (data: any) => {
        this.recoveries = this.recoveries.filter((recovery) => recovery._id !== _id);
      }
    );  
  }

  setAsRecovered(_id: string): void {
    this.recoveryService.updateRecovery(_id).subscribe(
      (data: any) => {
        this.recoveryService.getRecoveryList().subscribe(
          (data: any) => {
            this.recoveries = data;
            console.log('Recoveries:', this.recoveries);
          }
        );
      }
    );
  }
}