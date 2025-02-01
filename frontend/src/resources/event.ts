import axios from "axios";
import { useAuth } from "./auth";
import { UserPage } from "./user";

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
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  auth = useAuth();
  userSession = this.auth.getUserSession();

  async findEvents(pageNumber?: number, query?: string): Promise<EventPage> {
    const url = `${this.baseUrl}/events?page=${pageNumber}&query=${query}&size=12`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findEventsByProject(
    projectId?: number,
    pageNumber?: number
  ): Promise<EventPage> {
    const url = `${this.baseUrl}/events/by-project/${projectId}?page=${pageNumber}&size=8`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findEventById(id?: number): Promise<Event> {
    const url = `${this.baseUrl}/events/${id}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findEventByTitle(title?: string): Promise<Event> {
    const url = `${this.baseUrl}/events/by-title/${title}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async saveEvent(event: Event): Promise<void> {
    await axios(this.baseUrl + "/events/save", {
      method: "POST",
      data: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  
  async findUsersByEvent(eventId?: number, pageNumber?: number): Promise<UserPage> {
    const url = `${this.baseUrl}/event-user?eventId=${eventId}&page=${pageNumber}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${this.userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }
}
export const useEventService = () => new EventService();
