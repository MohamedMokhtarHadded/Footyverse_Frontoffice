import { AfterViewInit, Component, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/models/Training';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/models/Injury';

@Component({
  selector: 'app-injury-calender',
  templateUrl: './injury-calender.component.html',
  styleUrls: ['./injury-calender.component.css']
})
export class InjuryCalenderComponent implements AfterViewInit {

  @ViewChild('calendar') calendar: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventResize: this.handleEventResize.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventContent: this.eventContent.bind(this),
  };

  constructor(private injuryService: InjuryService) {}

  ngAfterViewInit() {
    this.loadCalendarInjuries();
  }

  loadCalendarInjuries() {
    this.injuryService.getInjuries().subscribe(
      (injuries: Injury[]) => {
        const formattedInjuries = injuries.map(injury => ({
          id: injury._id,
          title: injury.injuryType,
          start: injury.date,
          description: `Player: ${injury.player.firstName} ${injury.player.firstName}, Severity: ${injury.diagnosis}`,
          color: this.getInjuryColor(injury.diagnosis),
          extendedProps: {
            treatment: injury.treatment,
            doctor: injury.doctor,
            returnDate: injury.returnDate
          }
        }));

        this.calendarOptions.events = formattedInjuries;
        this.calendar.getApi().render();
      },
      error => {
        console.error('Error fetching calendar injuries:', error);
      }
    );
  }

  handleEventClick(eventInfo: any) {
    alert('Injury clicked: ' + eventInfo.event.title);
  }

  handleEventResize(eventInfo: any) {
    const updatedInjury = {
      _id: eventInfo.event.id,
      date: eventInfo.event.startStr,
      returnDate: eventInfo.event.endStr
    };

    this.injuryService.updateInjury(updatedInjury._id).subscribe(
      () => {
        console.log('Injury updated successfully');
      },
      error => {
        console.error('Error updating injury:', error);
      }
    );
  }

  handleEventDrop(eventInfo: any) {
    const updatedInjury = {
      _id: eventInfo.event.id,
      date: eventInfo.event.startStr
    };

    this.injuryService.updateInjury(updatedInjury._id).subscribe(
      () => {
        console.log('Injury updated successfully');
      },
      error => {
        console.error('Error updating injury:', error);
      }
    );
  }

  eventContent(eventInfo: any) {
    const description = eventInfo.event.extendedProps.description || '';
    const treatment = eventInfo.event.extendedProps.treatment || '';
    const doctor = eventInfo.event.extendedProps.doctor || '';
    const returnDate = eventInfo.event.extendedProps.returnDate || '';
  
    return {
      html: `
        <div class="fc-event-main">
          <span class="fc-event-title" style="color: black; font-weight: bold;">${eventInfo.event.title}</span>
          <div class="fc-event-time" style="color: black;font-weight: bold;">${eventInfo.timeText}</div>
        </div>
        <div class="fc-event-popover">
          <p style="color: black; font-weight: bold;font-weight: bold;">${description}</p>
          <p style="color: black;font-weight: bold;">Treatment: ${treatment}</p>
          <p style="color: black;font-weight: bold;">Doctor: ${doctor}</p>
          <p style="color: black;font-weight: bold;">Return Date: ${returnDate}</p>
        </div>
      `,
    };
  }
  

  eventRender(eventInfo: any) {
    eventInfo.el.querySelector('.fc-event-main').innerHTML += `
      <button class="btn btn-sm btn-primary" (click)="editInjury(${eventInfo.event.id})">Edit</button>
      <button class="btn btn-sm btn-danger" (click)="deleteInjury(${eventInfo.event.id})">Delete</button>
    `;
  }

  editInjury(injuryId: string) {
    // Implement logic to open an edit form or modal for the injury
  }

  deleteInjury(injuryId: string) {
    this.injuryService.deleteInjury(injuryId).subscribe(
      () => {
        this.calendar.getApi().getEventById(injuryId).remove();
        console.log('Injury deleted successfully');
      },
      error => {
        console.error('Error deleting injury:', error);
      }
    );
  }

  getInjuryColor(diagnosis: string): string {
    switch (diagnosis.toLowerCase()) {
      case 'severe':
        return 'red';
      case 'moderate':
        return 'yellow';
      default:
        return 'green';
    }
  }
}