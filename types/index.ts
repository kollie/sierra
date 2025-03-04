export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  eventsAttended: number;
  communities: number;
}

export interface EventOrganizer {
  id: string;
  name: string;
  avatar: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  attendees: number;
  attendeeAvatars: string[];
  organizer: EventOrganizer;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  members: number;
  joined: boolean;
  guidelines?: string;
}

export interface Notification {
  id: string;
  sender: string;
  message: string;
  avatar: string;
  time: string;
  read: boolean;
}