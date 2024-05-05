import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarEvent } from 'src/models/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendar: any;
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: []
  };

  constructor(private calendarService: CalendarService) {}

  ngAfterViewInit() {
    this.loadCalendarEvents();
  }
  loadCalendarEvents() {
    this.calendarService.getEvents().subscribe(
      (events: CalendarEvent[]) => {
        // Transform events into FullCalendar format
        const formattedEvents = events.map(event => ({
          title: event.title,
          start: event.date,
          description: event.description,
          location: event.location, // Include location here
          // Add other properties as needed
        }));  
        // Set the events for the calendar
        this.calendarOptions.events = formattedEvents;
        // Render the calendar
        this.calendar.getApi().render();
      },
      error => {
        console.error('Error fetching calendar events:', error);
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
