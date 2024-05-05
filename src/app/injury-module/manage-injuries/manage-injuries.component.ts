import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/models/Injury';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-manage-injuries',
  templateUrl: './manage-injuries.component.html',
  styleUrls: ['./manage-injuries.component.css']
})
export class ManageInjuriesComponent {
  injuries!: Injury[];
  selectedOption: string = 'injured';
  filteredInjuries!: Injury[];

  searchText: string = '';
  

  constructor(private injuryService: InjuryService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.injuryService.getInjuries().subscribe(
      (injuries: Injury[]) => {
        console.log('Injuries fetched successfully:', injuries);
        this.injuries = injuries;
        this.filteredInjuries = this.injuries;
        this.filteredInjuries = this.injuries.filter(injury => !this.isReturnDateBeforeCurrentDate(injury.returnDate));
        this.filterInjuries();


      },
      error => {
        console.error('Error fetching injuries:', error);
      }
    );
    localStorage.setItem('role', 'trainer');
  }

  deleteInjury(_id: string) {
    this.injuryService.deleteInjury(_id).subscribe(
      (response: any) => {
        this.injuries = this.injuries.filter(injury => injury._id !== _id);
        this.filteredInjuries = this.filteredInjuries.filter(injury => injury._id !== _id);
        console.log('injuries : ', this.injuries);
        console.log('filteredInjuries : ', this.filteredInjuries);
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
        this.deleteInjury(_id);
      }
    });
  }



  generatePDF() {
    const tableBody = [];
    for (const injury of this.injuries) {
      tableBody.push([
        { text: 'Date:', bold: true },
        new Date(injury.date).toLocaleDateString('en-US', { dateStyle: 'long' })
      ]);
      tableBody.push([
        { text: 'Description:', bold: true },
        injury.description
      ]);
      tableBody.push([
        { text: 'Diagnosis:', bold: true },
        injury.diagnosis
      ]);
      tableBody.push([
        { text: 'Doctor:', bold: true },
        injury.doctor
      ]);
      tableBody.push([
        { text: 'Injury Type:', bold: true },
        injury.injuryType
      ]);
      tableBody.push([
        { text: 'Player:', bold: true },
        `${injury.player.firstName} ${injury.player.lastName}`
      ]);
      tableBody.push([
        { text: 'Return Date:', bold: true },
        new Date(injury.returnDate).toLocaleDateString('en-US', { dateStyle: 'long' })
      ]);
      tableBody.push([
        { text: 'Time left:', bold: true },
        injury.time + ' days'
      ]);
      tableBody.push([
        { text: 'Treatment:', bold: true },
        injury.treatment
      ]);
      tableBody.push([{ text: '', colSpan: 2, border: [false, false, false, false] }]); // Add an empty row to separate injuries
    }
  
    const documentDefinition = {
      content: [
        { text: 'List of injuries :', style: 'header' },
        '\n\n',
        {
          table: {
            widths: ['30%', '70%'],
            body: tableBody
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };
  
    pdfMake.createPdf(documentDefinition).download('injury_details.pdf');
  }
}