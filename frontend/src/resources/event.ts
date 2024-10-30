import axios from "axios";


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
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/events";

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