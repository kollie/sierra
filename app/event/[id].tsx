import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform, Alert, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Calendar as CalendarIcon, Clock, Users, ArrowLeft, Share2, Heart } from 'lucide-react-native';
import * as Calendar from 'expo-calendar';
import { parse } from 'date-fns';
import { mockEvents } from '@/data/mockData';
import { Button } from '@/components/Button';
import { Event } from '@/types';

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Find the event by id or use the first event as fallback
  const eventId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];

  const handleJoinAndAddToCalendar = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Calendar integration is not available on web');
      return;
    }

    try {
      // Request calendar permissions
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow calendar access to add this event.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Parse event date and time
      const eventDate = parse(event.date, 'MMMM d, yyyy', new Date());
      const [hours, minutes] = event.time.split(' ')[0].split(':');
      const isPM = event.time.includes('PM');
      
      const startDate = new Date(eventDate);
      startDate.setHours(
        isPM ? parseInt(hours) + 12 : parseInt(hours),
        parseInt(minutes)
      );
      
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 2); // Default 2-hour duration

      // Open native calendar app with pre-filled event details
      if (Platform.OS === 'ios') {
        // For iOS, use the ical URL scheme with event details
        const eventDetails = {
          title: encodeURIComponent(event.title),
          location: encodeURIComponent(event.location),
          notes: encodeURIComponent(event.description),
          startDate: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
          endDate: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        };

        const url = `webcal://p44-caldav.icloud.com/published/2/MTAwMjgzNDk5OTEwMDI4M0JvbGl2aWFAaWNsb3VkLmNvbQ/new-event/?title=${eventDetails.title}&location=${eventDetails.location}&notes=${eventDetails.notes}&startDate=${eventDetails.startDate}&endDate=${eventDetails.endDate}`;
        
        await Linking.openURL(url);
      } else {
        // For Android, get the default calendar first
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendar = calendars.find(calendar => calendar.isPrimary) || calendars[0];

        if (!defaultCalendar) {
          throw new Error('No calendar found');
        }

        // Create the event
        const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
          title: event.title,
          location: event.location,
          notes: event.description,
          startDate: startDate,
          endDate: endDate,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          alarms: [{
            relativeOffset: -60, // Reminder 1 hour before
            method: Calendar.AlarmMethod.ALERT,
          }],
        });

        // Open the calendar app to the event
        await Calendar.openEventInCalendar(eventId);
      }

    } catch (error) {
      console.error('Calendar error:', error);
      Alert.alert(
        'Error',
        'Failed to add event to calendar. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: event.image }} 
            style={styles.image}
          />
          <View style={styles.imageOverlay}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <Heart size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Share2 size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.organizerContainer}>
            <Image 
              source={{ uri: event.organizer.avatar }} 
              style={styles.organizerAvatar}
            />
            <View>
              <Text style={styles.organizerLabel}>Organized by</Text>
              <Text style={styles.organizerName}>{event.organizer.name}</Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <CalendarIcon size={20} color="#000080" />
              <Text style={styles.detailText}>{event.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={20} color="#000080" />
              <Text style={styles.detailText}>{event.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <MapPin size={20} color="#000080" />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Users size={20} color="#000080" />
              <Text style={styles.detailText}>{event.attendees} attendees</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attendees</Text>
            <View style={styles.attendeesContainer}>
              {event.attendeeAvatars.map((avatar, index) => (
                <Image 
                  key={index}
                  source={{ uri: avatar }} 
                  style={[
                    styles.attendeeAvatar,
                    { marginLeft: index > 0 ? -15 : 0 }
                  ]}
                />
              ))}
              {event.attendees > event.attendeeAvatars.length && (
                <View style={styles.moreAttendeesContainer}>
                  <Text style={styles.moreAttendeesText}>+{event.attendees - event.attendeeAvatars.length}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>{event.price === 0 ? 'Free' : `$${event.price}`}</Text>
        </View>
        <Button 
          title="Join Event" 
          onPress={handleJoinAndAddToCalendar}
          style={styles.joinButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  organizerLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  organizerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  detailsContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  moreAttendeesContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  moreAttendeesText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000080',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  joinButton: {
    flex: 2,
  },
});