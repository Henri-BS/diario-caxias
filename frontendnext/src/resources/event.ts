import { BASE_URL } from ".";

export type Event = {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  season?: string;
  status?: string;
  image?: string;
  projectTitle?: string;
  userId?: number;
  username?: number;
};

export type EventPage = {
  content: Event[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

export type EventProps = {
  event: Event;
};

class EventService {

  async saveEvent(event: Event): Promise<void> {
    const response = await fetch(BASE_URL + "/events/save", {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 409) {
      const responseError = await response.json();
      throw new Error(responseError.error);
    }
  }
}
export const useEventService = () => new EventService();
