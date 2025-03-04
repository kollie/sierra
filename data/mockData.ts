import { User, Event, Community, Notification } from '@/types';

export const mockUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
  bio: 'Passionate about connecting people and building communities. Love hiking, photography, and trying new cuisines.',
  location: 'San Francisco, CA',
  eventsAttended: 24,
  communities: 8,
};

export const mockEvents: Event[] = [
  {
    id: 'event1',
    title: 'Tech Meetup: AI and the Future',
    description: 'Join us for an evening of discussions about artificial intelligence and its impact on our future. We\'ll have speakers from leading tech companies sharing their insights and experiences.',
    image: 'https://images.unsplash.com/photo-1540304453527-62f979142a17?q=80&w=3270&auto=format&fit=crop',
    date: 'May 15, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'Tech Hub, San Francisco',
    category: 'technology',
    price: 0,
    attendees: 87,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3280&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3461&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3270&auto=format&fit=crop',
    ],
    organizer: {
      id: 'user2',
      name: 'Tech Community SF',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=3387&auto=format&fit=crop',
    },
  },
  {
    id: 'event2',
    title: 'Outdoor Yoga in the Park',
    description: 'Start your weekend with a rejuvenating yoga session in the beautiful Golden Gate Park. All levels welcome! Bring your own mat and water.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=3270&auto=format&fit=crop',
    date: 'May 18, 2025',
    time: '9:00 AM - 10:30 AM',
    location: 'Golden Gate Park, San Francisco',
    category: 'sports',
    price: 15,
    attendees: 42,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop',
    ],
    organizer: {
      id: 'user3',
      name: 'SF Yoga Collective',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3270&auto=format&fit=crop',
    },
  },
  {
    id: 'event3',
    title: 'Art Gallery Opening Night',
    description: 'Be among the first to experience our new exhibition featuring works from emerging local artists. Wine and light refreshments will be served.',
    image: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?q=80&w=3270&auto=format&fit=crop',
    date: 'May 20, 2025',
    time: '7:00 PM - 10:00 PM',
    location: 'Modern Art Space, San Francisco',
    category: 'arts',
    price: 25,
    attendees: 63,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3276&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=3387&auto=format&fit=crop',
    ],
    organizer: {
      id: 'user4',
      name: 'SF Art Collective',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop',
    },
  },
  {
    id: 'event4',
    title: 'Networking Breakfast for Entrepreneurs',
    description: 'Connect with fellow entrepreneurs over breakfast and share ideas, challenges, and opportunities. Great chance to expand your professional network.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=3432&auto=format&fit=crop',
    date: 'May 22, 2025',
    time: '8:00 AM - 10:00 AM',
    location: 'Business Center, Downtown SF',
    category: 'social',
    price: 30,
    attendees: 35,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=3387&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3388&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3270&auto=format&fit=crop',
    ],
    organizer: {
      id: 'user5',
      name: 'SF Entrepreneurs',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3387&auto=format&fit=crop',
    },
  },
  {
    id: 'event5',
    title: 'Hiking Adventure: Coastal Trail',
    description: 'Join us for a scenic hike along the beautiful coastal trail. We\'ll enjoy breathtaking views and good company. Moderate difficulty level.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=3270&auto=format&fit=crop',
    date: 'May 25, 2025',
    time: '10:00 AM - 2:00 PM',
    location: 'Coastal Trail Starting Point, Marin Headlands',
    category: 'outdoors',
    price: 0,
    attendees: 28,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3280&auto=format&fit=crop',
    ],
    organizer: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
    },
  },
  {
    id: 'event6',
    title: 'Cooking Class: Italian Cuisine',
    description: 'Learn to cook authentic Italian dishes with our experienced chef. You\'ll prepare and enjoy a complete meal, from appetizers to dessert.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=3270&auto=format&fit=crop',
    date: 'May 27, 2025',
    time: '6:30 PM - 9:30 PM',
    location: 'Culinary Institute, San Francisco',
    category: 'education',
    price: 75,
    attendees: 18,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=3270&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3276&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=3387&auto=format&fit=crop',
    ],
    organizer: {
      id: 'user6',
      name: 'SF Culinary Arts',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=3270&auto=format&fit=crop',
    },
  },
];

export const mockCommunities: Community[] = [
  {
    id: 'community1',
    name: 'Tech Enthusiasts SF',
    description: 'A community for tech lovers in San Francisco to connect, share ideas, and collaborate on projects.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=3270&auto=format&fit=crop',
    category: 'technology',
    members: 1250,
    joined: true,
  },
  {
    id: 'community2',
    name: 'Outdoor Adventures',
    description: 'For those who love hiking, camping, and exploring the great outdoors around the Bay Area.',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=3273&auto=format&fit=crop',
    category: 'outdoors',
    members: 876,
    joined: false,
  },
  {
    id: 'community3',
    name: 'SF Art Collective',
    description: 'A community of artists and art enthusiasts in San Francisco sharing their work and organizing exhibitions.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=3280&auto=format&fit=crop',
    category: 'arts',
    members: 543,
    joined: true,
  },
  {
    id: 'community4',
    name: 'Foodies of SF',
    description: 'For food lovers to share restaurant recommendations, recipes, and organize culinary events.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=3270&auto=format&fit=crop',
    category: 'social',
    members: 1890,
    joined: false,
  },
  {
    id: 'community5',
    name: 'Yoga & Wellness',
    description: 'A community focused on yoga, meditation, and overall wellness practices.',
    image: 'https://images.unsplash.com/photo-1599447292180-45fd84092ef4?q=80&w=3270&auto=format&fit=crop',
    category: 'sports',
    members: 720,
    joined: true,
  },
  {
    id: 'community6',
    name: 'Entrepreneurs Network',
    description: 'Connect with fellow entrepreneurs to share experiences, advice, and business opportunities.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3270&auto=format&fit=crop',
    category: 'education',
    members: 950,
    joined: false,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notification1',
    sender: 'Tech Community SF',
    message: 'invited you to the event "Tech Meetup: AI and the Future"',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=3387&auto=format&fit=crop',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'notification2',
    sender: 'Sarah Chen',
    message: 'is now attending your event "Hiking Adventure: Coastal Trail"',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3461&auto=format&fit=crop',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 'notification3',
    sender: 'Outdoor Adventures',
    message: 'posted a new event "Weekend Camping Trip"',
    avatar: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=3273&auto=format&fit=crop',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'notification4',
    sender: 'Michael Rodriguez',
    message: 'commented on your event "Cooking Class: Italian Cuisine"',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop',
    time: '2 days ago',
    read: true,
  },
  {
    id: 'notification5',
    sender: 'SF Art Collective',
    message: 'invited you to join their community',
    avatar: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=3280&auto=format&fit=crop',
    time: '3 days ago',
    read: true,
  },
];