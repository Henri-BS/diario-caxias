export type Event = {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  season?: string;
  status?: string;
  imageUrl?: string;
  projectId?: number;
  projectTitle?: string;
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
