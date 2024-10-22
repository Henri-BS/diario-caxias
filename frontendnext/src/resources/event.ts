import axios from "axios";
import { BASE_URL } from ".";


export type Event = {
  id?: number;
  eventTitle?: string;
  eventDescription?: string;
  eventImage?: string;
  eventDate?: string;
  eventStatus?: string;
  createdDate?: string;
  projectTitle?: string;
  userId?: number;
  username?: number;
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

export type EventCategory = {
  id?: number;
  categoryName?: string;
  eventId?: number;
  eventTitle?: string;
  eventDate?: string;
  eventStatus?: string;
  eventImage?: string;
  eventProjectTitle?: string;
};

export type EventCategoryProps = {
  eventCategory: EventCategory;
};


class EventService {

  async saveEvent(event: Event): Promise<void> {
    const response = await axios(BASE_URL + "/events/save", {
      method: "POST",
      data: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 409) {
      const responseError = await response.data;
      throw new Error(responseError.error);
    }
  }
}
export const useEventService = () => new EventService();
