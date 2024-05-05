export interface CalendarEvent {
    _id: string; // Assuming MongoDB ObjectId
    title: string;
    date: Date;
    time: string;
    location: string;
    description: string;
  }
  