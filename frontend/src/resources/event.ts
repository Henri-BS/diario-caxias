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

export type EventUser = {
  id?: number;
  eventId?: number;
  eventTitle?: string;
  eventImage?: string;
  projectId?: number;
  projectTitle?: string;
  userId?: number;
  username?: string; 
  userImage?: string;
 
}

export type EventPost = {
  id?: number;
  eventId?: number;
  eventTitle?: string;
  eventImage?: string;
  projectId?: number;
  projectTitle?: string;
  userId?: number;
  postId?: number;
  postTitle?: string;
}