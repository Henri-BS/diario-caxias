export type Event = {
  eventId?: number;
  eventTitle?: string;
  eventDescription?: string;
  eventImage?: string;
  eventDate?: string;
  eventStatus?: string;
  createdDate?: string;
  projectId?: number;
  projectTitle?: string;
  userId?: number;
  username?: string;
};

export type EventPage = {
  content: Event[];
  page: {
    totalElements: number;
    number: number;
  };
};

export type EventProps = {
  event: Event;
};
