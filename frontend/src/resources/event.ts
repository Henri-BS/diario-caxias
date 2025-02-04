import axios from "axios";
import { useAuth } from "./auth";
import { baseUrl } from "utils/requests";

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

class EventService {
  auth = useAuth();
  userSession = this.auth.getUserSession();

  async saveEvent(event: Event): Promise<void> {
    await axios(baseUrl + "/events/save", {
      method: "POST",
      data: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

}
export const useEventService = () => new EventService();
