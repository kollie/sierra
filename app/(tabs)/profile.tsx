import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, MapPin, Calendar, Users, CreditCard as Edit, Heart } from 'lucide-react-native';
import { mockUser, mockEvents } from '@/data/mockData';
import { EventCard } from '@/components/EventCard';
import { useLikedEvents } from '@/hooks/useLikedEvents';

export default function ProfileScreen() {
  const router = useRouter();
  const { likedEvents } = useLikedEvents();
  const userEvents = mockEvents.filter(event => event.organizer.id === mockUser.id).slice(0, 2);
  const attendingEvents = mockEvents.slice(0, 3);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Settings size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: mockUser.avatar }} 
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{mockUser.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.locationText}>{mockUser.location}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push('/edit-profile')}
            >
              <Edit size={16} color="#000080" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Calendar size={20} color="#000080" />
            <Text style={styles.statValue}>{mockUser.eventsAttended}</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Users size={20} color="#000080" />
            <Text style={styles.statValue}>{mockUser.communities}</Text>
            <Text style={styles.statLabel}>Communities</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Heart size={20} color="#000080" />
            <Text style={styles.statValue}>{likedEvents.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
        
        <View style={styles.bioContainer}>
          <Text style={styles.bioTitle}>About</Text>
          <Text style={styles.bioText}>{mockUser.bio}</Text>
        </View>
        
        {likedEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Favorite Events</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
              {likedEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  onPress={() => router.push(`/event/${event.id}`)}
                />
              ))}
            </ScrollView>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Events</Text>
          <View style={styles.eventsContainer}>
            {userEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                variant="horizontal"
                onPress={() => router.push(`/event/${event.id}`)}
              />
            ))}
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attending</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {attendingEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                onPress={() => router.push(`/event/${event.id}`)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000080',
    marginLeft: 4,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  divider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  bioContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  eventsContainer: {
    gap: 12,
  },
  viewAllButton: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000080',
    textAlign: 'center',
  },
  horizontalList: {
    marginLeft: -8,
    paddingLeft: 8,
  },
});