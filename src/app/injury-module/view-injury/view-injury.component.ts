import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/models/Injury';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-injury',
  templateUrl: './view-injury.component.html',
  styleUrls: ['./view-injury.component.css']
})
export class ViewInjuryComponent {
  injury!: Injury;

  constructor(private injuryService: InjuryService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location
    ) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params => {
      console.log('params: ', params['id']);
      this.injuryService.getInjury(params['id']).subscribe(
        (injury) => {
          this.injury = injury;
          console.log('Injury fetched successfully:', injury);
        }
      );
    });
  }

  goBack() {
    this.location.back();
  }

  editInjury() {
    this.router.navigate(['/injury/editInjury', this.injury._id]);
  }

  isReturnDateBeforeCurrentDate(dateString: string): boolean {
    const returnDate = new Date(dateString);
    const currentDate = new Date();
    return returnDate < currentDate;
  }
}
