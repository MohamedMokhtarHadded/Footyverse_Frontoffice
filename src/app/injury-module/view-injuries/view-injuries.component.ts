import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/models/Injury';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/models/Player';
@Component({
  selector: 'app-view-injuries',
  templateUrl: './view-injuries.component.html',
  styleUrls: ['./view-injuries.component.css']
})
export class ViewInjuriesComponent {
  injuries!: Injury[];
  selectedOption: string = 'injured';
  filteredInjuries: Injury[] = [];

  searchText: string = '';


  pageSize = 5;
  currentPage = 0;
  paginatedInjuries: Injury[] = [];
  totalOffers = 0;
  selectedDiv!: number;
  injuredPlayer: Player[] = [];


  injuriesWithPlayer: any[] = [];




  constructor(private injuryService: InjuryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private playerService: PlayerService

  ) { }

  async ngOnInit(): Promise<void> {
    this.injuryService.getInjuries().subscribe(
      (injuries: Injury[]) => {
        console.log('Injuries fetched successfully:', injuries);
        this.injuries = injuries;
        this.filteredInjuries = this.injuries;
        this.filteredInjuries = this.injuries.filter(injury => !this.isReturnDateBeforeCurrentDate(injury.returnDate));
        this.filterInjuries();
        this.updatePagination();
      },
      error => {
        console.error('Error fetching injuries:', error);
      }
    );
    localStorage.setItem('role', 'trainer');




    /*
        for (const injury of this.paginatedInjuries) {
          // Fetch player details using playerService.getPlayer(playerId)
          const player = this.playerService.getPlayer(injury.player);
          console.log('Player:', player);
    
          // Create a new object combining injury and player details
          const injuryWithPlayer = {
            player
          };
          console.log('Injury with player:', injuryWithPlayer);
    
          // Push the combined object into injuriesWithPlayer array
          this.injuriesWithPlayer.push(injuryWithPlayer);
        }
    
        console.log('Injuries with player:', this.injuriesWithPlayer);
    
        */




  }

  deleteInjury(_id: string) {
    console.log('Deleting injury:', _id);
    this.injuryService.deleteInjury(_id).subscribe(
      (response: any) => {
        console.log('Injury deleted successfully:', response);
        this.filteredInjuries = this.filteredInjuries.filter(injury => injury._id !== _id);
      },
      error => {
        console.error('Error deleting injury:', error);
      }
    );
    this.filterInjuries();
  }

  editInjury(_id: string) {
    this.router.navigate(['/injury/editInjury', _id]);
  }

  viewInjury(_id: string) {
    this.router.navigate(['/injury/viewInjury', _id]);
  }

  isReturnDateBeforeCurrentDate(dateString: string): boolean {
    const returnDate = new Date(dateString);
    const currentDate = new Date();
    return returnDate < currentDate;
  }

  filterInjuries() {
    console.log("selectedOption: ", this.selectedOption);
    if (this.selectedOption === 'injured') {
      this.filteredInjuries = this.injuries.filter(injury => !this.isReturnDateBeforeCurrentDate(injury.returnDate));
      console.log("filteredInjuries: ", this.filteredInjuries);
    }
    else if (this.selectedOption === 'recovered') {
      this.filteredInjuries = this.injuries.filter(injury => this.isReturnDateBeforeCurrentDate(injury.returnDate));
    } else {
      this.filteredInjuries = this.injuries;
    }
    this.updatePagination();
  }

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.filterInjuries();
    // Apply filter based on search text
    this.filteredInjuries = this.filteredInjuries.filter(injury =>
      Object.values(injury).some(value =>
        value.toString().toLowerCase().includes(filterValue)
      )
    );
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedInjuries = this.filteredInjuries.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.selectedDiv = this.currentPage * this.pageSize;
    this.updatePagination();
  }

  openDeleteDialog(_id: string) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '450px',
      height: '180px',
      data: { id: _id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
      }
    });
  }

}

