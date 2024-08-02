export type Event = {
  id: number;
  title: string;
  description: string;
  image: string;
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
