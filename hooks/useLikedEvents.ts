import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '@/types';

const LIKED_EVENTS_KEY = '@chapters:liked_events';

export function useLikedEvents() {
  const [likedEvents, setLikedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load liked events from storage on mount
  useEffect(() => {
    loadLikedEvents();
  }, []);

  const loadLikedEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem(LIKED_EVENTS_KEY);
      if (storedEvents) {
        setLikedEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Error loading liked events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLikeEvent = async (event: Event) => {
    try {
      const isLiked = likedEvents.some(e => e.id === event.id);
      let updatedEvents: Event[];

      if (isLiked) {
        updatedEvents = likedEvents.filter(e => e.id !== event.id);
      } else {
        updatedEvents = [...likedEvents, event];
      }

      await AsyncStorage.setItem(LIKED_EVENTS_KEY, JSON.stringify(updatedEvents));
      setLikedEvents(updatedEvents);
      return !isLiked; // Return new liked state
    } catch (error) {
      console.error('Error toggling event like:', error);
      return isLiked; // Return original state if error
    }
  };

  const isEventLiked = (eventId: string): boolean => {
    return likedEvents.some(event => event.id === eventId);
  };

  return {
    likedEvents,
    isLoading,
    toggleLikeEvent,
    isEventLiked,
  };
}