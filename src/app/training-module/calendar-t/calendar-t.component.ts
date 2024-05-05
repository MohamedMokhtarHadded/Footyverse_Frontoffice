import { AfterViewInit, Component, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/models/Training';
@Component({
  selector: 'app-calendar-t',
  templateUrl: './calendar-t.component.html',
  styleUrls: ['./calendar-t.component.css']
})
export class CalendarTComponent implements AfterViewInit {
    // Reference to the FullCalendar component in the template.

  @ViewChild('calendar') calendar: any;
    // Configuration options for the FullCalendar component.

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',// Start in month view.
    plugins: [dayGridPlugin, interactionPlugin],// Enable day grid and interaction plugins.
    events: []
    
  };
  

  constructor(private trainingService: TrainingService) {}

  ngAfterViewInit() {
    this.loadCalendarTrainings();
  }
  // Fetches training data from the training service and populates the calendar.

  loadCalendarTrainings() {
    this.trainingService.getTrainings().subscribe(
      (trainings: Training[]) => {
                // Transform training data into FullCalendar event format.

        // Transform events into FullCalendar format
        const formattedTrainings = trainings.map(training => ({
          title: training.trainingType,
          start: training.date,
          description: training.player,
          // Include other properties as needed
        }));
        
        // Set the events for the calendar
        this.calendarOptions.events = formattedTrainings;
        
        // Render the calendar
        this.calendar.getApi().render();
      },
      error => {
        console.error('Error fetching calendar trainings:', error);
      }
    );
  }

  // Function to handle event click
  handleEventClick(eventInfo: any) {
    alert('Event clicked: ' + eventInfo.event.title);
  }

  // Function to handle date click
  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }
}