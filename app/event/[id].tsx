import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform, Alert, Share, Linking } from 'react-native';
import { parse } from "date-fns";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Calendar as CalendarIcon, Clock, Users, ArrowLeft, Share2, Heart } from 'lucide-react-native';
import * as Calendar from 'expo-calendar';
import { mockEvents } from '@/data/mockData';
import { Button } from '@/components/Button';
import { Event } from '@/types';

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const eventId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];

  const handleShare = async () => {
    try {
      const eventUrl = `chapters://event/${event.id}`;
      const message = `Join me at "${event.title}"!\n\n📅 ${event.date}\n⏰ ${event.time}\n📍 ${event.location}\n\nOpen in app: ${eventUrl}`;

      if (Platform.OS === 'web') {
        if (navigator.share) {
          await navigator.share({
            title: event.title,
            text: message,
            url: eventUrl,
          });
        } else {
          await navigator.clipboard.writeText(message);
          Alert.alert('Success', 'Event details copied to clipboard!');
        }
      } else {
        const result = await Share.share({
          message,
          title: event.title,
          url: eventUrl,
        });

        if (result.action === Share.sharedAction) {
          console.log("Event shared successfully!");
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share event. Please try again.');
    }
  };

  
const createWritableCalendar = async () => {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await Calendar.getDefaultCalendarAsync()
      : { isLocalAccount: true, name: "Expo Calendar" };

  return await Calendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    source: defaultCalendarSource,
    name: "Expo Calendar",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
};

  const handleJoinAndAddToCalendar = async () => {
  console.log("Join button clicked");

  const { status } = await Calendar.requestCalendarPermissionsAsync();
  console.log("Permission status:", status);

  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Calendar permissions are required to add events."
    );
    return;
  }

  try {
    // Extract the date and start time (remove time range if present)
    const dateString = event.date; // Example: "May 15, 2025"
    let timeString = event.time; // Example: "6:00 PM - 9:00 PM"

    // Extract only the first time (before the dash)
    timeString = timeString.split(" - ")[0].trim(); // "6:00 PM"

    // Ensure correct format before parsing
    const dateTimeString = `${dateString} ${timeString}`;
    console.log("Combined date and time:", dateTimeString);

    // Use correct format for parsing
    const startDate = parse(dateTimeString, "MMMM d, yyyy h:mm a", new Date());
    console.log("Parsed start date:", startDate);

    // Check if parsing was successful
    if (isNaN(startDate.getTime())) {
      throw new Error("Invalid date or time format. Please check event details.");
    }

    // Set end time (2 hours after start time)
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    console.log("Event start date:", startDate);
    console.log("Event end date:", endDate);

    // Open the calendar interface for user to edit
    await Calendar.createEventInCalendarAsync({
      title: event.title,
      startDate,
      endDate,
      location: event.location,
      notes: event.description,
    });

    // console.log("Event creation interface opened in calendar");

    // Show success message
    // Alert.alert(
    //   "Success",
    //   "Event added to your calendar! You're now attending this event.",
    //   [{ text: "Great!" }]
    // );

  } catch (error) {
    console.error("Error handling calendar event:", error.message);
    Alert.alert(
      "Error",
      error.message || "Failed to open calendar for editing."
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
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={handleShare}
              >
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