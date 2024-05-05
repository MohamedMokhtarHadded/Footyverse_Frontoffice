import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoutingService } from 'src/app/services/scouting.service';

import { Location } from '@angular/common';
import { scouting } from 'src/models/scouting';

@Component({
  selector: 'app-detail-scouting',
  templateUrl: './detail-scouting.component.html',
  styleUrls: ['./detail-scouting.component.css']
})
export class DetailScoutingComponent implements OnInit {
  scouting!: scouting;
  playerRating: number | undefined;
  

  constructor(
    private scoutingService: ScoutingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('Params:', params['id']);

      this.scoutingService.getscouting(params['id']).subscribe(
        (scouting: any) => {
          console.log('Scouting entry fetched successfully:', scouting);
          this.scouting = scouting;
        },
        (error) => {
          console.log('Error retrieving scouting entry:', error);
        }
      );
    });
  }

  goBack() {
    this.location.back();
  }
  
  updateScouting() {
    this.router.navigate(['/scouting/update-scouting', this.scouting._id]);
  }
  ratePlayer(): void {
    if (!this.scouting) {
      console.error('No scouting data available.');
      return;
    }
  
    // Extract player statistics from the current scouting entry
    const { MatchesPlayed, GoalsScored, Assists, YellowCards, RedCards, ShotsonTarget } = this.scouting;
  
    // Convert string values to numbers
    const matchesPlayed = parseFloat(MatchesPlayed.toLowerCase());
    const goalsScored = parseFloat(GoalsScored.toLowerCase());
    const assists = parseFloat(Assists.toLowerCase());
    const yellowCards = parseFloat(YellowCards.toLowerCase());
    const redCards = parseFloat(RedCards.toLowerCase());
    const shotsOnTarget = parseFloat(ShotsonTarget.toLowerCase());
  
    // Perform your rating calculation here using the fetched statistics
    let rating = (matchesPlayed + goalsScored + assists - yellowCards - redCards + shotsOnTarget) / 10;
  
    // Ensure rating is capped at 10
    rating = Math.min(rating, 10);
  
    // Round the rating to one decimal place
    this.playerRating = Math.round(rating * 10) / 10;
  }
  
  generateStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating); // Get the integer part for full stars
    const remainder = rating % 1; // Get the decimal part for half star
  
    // Fill in full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
  
    // Add half star if applicable
    if (remainder >= 0.25 && remainder <= 0.75) {
      stars.push('half');
    }
  
    // Fill in remaining empty stars to total 10
    const totalStars = stars.length;
    for (let i = totalStars; i < 10; i++) {
      stars.push('empty');
    }
  
    return stars;
  }
  
  
}