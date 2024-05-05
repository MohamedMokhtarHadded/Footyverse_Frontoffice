import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/models/Injury';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent {
  injuries!: Injury[];

  constructor(private injuryService: InjuryService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Params:', params);

        if (params['playerId']) {
          this.injuryService.getInjuriesByPlayer(params['playerId']).subscribe(
            (injuries: Injury[]) => {
              console.log('Injuries fetched successfully:', injuries);
              this.injuries = injuries;
            },
            error => {
              console.error('Error fetching injuries:', error);
            }
          );
        }
      })

    // this.injuryService.getInjuries().subscribe(
    //   (injuries: Injury[]) => {
    //     console.log('Injuries fetched successfully:', injuries);
    //     this.injuries = injuries;
    //   },
    //   error => {
    //     console.error('Error fetching injuries:', error);
    //   }
    // );
    // localStorage.setItem('role', 'trainer');
  }

  deleteInjury(_id: string) {
    console.log('Deleting injury:', _id);
    this.injuryService.deleteInjury(_id).subscribe(
      (response: any) => {
        console.log('Injury deleted successfully:', response);
        this.injuries = this.injuries.filter(injury => injury._id !== _id);
      },
      error => {
        console.error('Error deleting injury:', error);
      }
    );
  }
  
  editInjury(_id: string) {
    this.router.navigate(['/injury/editInjury', _id]);
  }

  viewInjury(_id: string) {
    this.router.navigate(['/injury/viewInjury', _id]);
  }
    
}