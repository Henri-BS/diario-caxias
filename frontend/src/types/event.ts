// EventTypes

export type Event = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  season: string;
  status: string;
  projectId: number;
};

export type EventPage = {
  content?: Event[];
  size?: number;
  pageNumber?: number;
  numberOfElements?: number;
  totalElements?: number;
  totalPages?: number;
  number: number;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
};

export type EventProps = {
  event: Event;
};

// EventCategory Types

export type EventCategory = {
  id: number;
  eventId: number;
  eventTitle: string;
  categoryId: number;
  categoryName: string;
};

export type EventCategoryPage = {
  content?: EventCategory[];
  size?: number;
  pageNumber?: number;
  numberOfElements?: number;
  totalElements?: number;
  totalPages?: number;
  number: number;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
};

export type EventCategoryProps = {
  eventCategory: EventCategory;
};

