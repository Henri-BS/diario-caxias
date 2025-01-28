import axios from "axios";
import { useAuth } from "./auth";

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
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080" + "/events";
    auth = useAuth();

    async findEvents( pageNumber?: number, query?: string): Promise<EventPage> {
      const userSession = this.auth.getUserSession();
      const url = `${this.baseUrl}?page=${pageNumber}&query=${query}&size=12`;
      const response = axios(url, {
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
        },
      });
      const resp = await response;
      return resp.data;
    }
  
    async findEventsByProject( projectId?: number, pageNumber?: number ): Promise<EventPage> {
      const userSession = this.auth.getUserSession();
      const url = `${this.baseUrl}/by-project/${projectId}?page=${pageNumber}&size=8`;
      const response = axios(url, {
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
        },
      });
      const resp = await response;
      return resp.data;
    }

    async findEventById(id?: number): Promise<Event> {
      const userSession = this.auth.getUserSession();
      const url = `${this.baseUrl}/${id}`;
      const response = axios(url, {
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
        },
      });
      const resp = await response;
      return resp.data;
    }

  async saveEvent(event: Event): Promise<void> {
    const response = await axios(this.baseUrl + "/save", {
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