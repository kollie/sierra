import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, MapPin, Filter, X, ChevronDown, Navigation } from 'lucide-react-native';
import { mockEvents } from '@/data/mockData';
import { EventCard } from '@/components/EventCard';
import { CommunityCard } from '@/components/CommunityCard';
import { SearchBar } from '@/components/SearchBar';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCommunities, toggleJoinCommunity } from '@/store/community/actions';

// Popular cities for location selection
const popularLocations = [
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Seattle, WA',
  'Austin, TX',
  'Boston, MA',
  'Denver, CO',
  'Miami, FL',
  'Portland, OR',
];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { communities } = useAppSelector((state) => state.community);

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents.slice(0, 3));
  const [filteredNearbyEvents, setFilteredNearbyEvents] = useState(mockEvents.slice(3, 6));
  const [filteredCommunities, setFilteredCommunities] = useState<typeof communities>([]);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Fetch communities on component mount
  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  // Update filtered communities when communities change
  useEffect(() => {
    const popularCommunities = communities.slice(0, 4);
    setFilteredCommunities(popularCommunities);
  }, [communities]);

  // Filter content when search query changes
  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();

      // Filter featured events
      const matchingEvents = mockEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(lowercaseQuery) ||
          event.description.toLowerCase().includes(lowercaseQuery) ||
          event.location.toLowerCase().includes(lowercaseQuery) ||
          event.category.toLowerCase().includes(lowercaseQuery)
      );

      setFilteredEvents(matchingEvents.slice(0, 3));
      setFilteredNearbyEvents(matchingEvents.slice(3, 6));

      // Filter communities
      const matchingCommunities = communities.filter(
        (community) =>
          community.name.toLowerCase().includes(lowercaseQuery) ||
          community.description.toLowerCase().includes(lowercaseQuery) ||
          (community.location &&
            community.location.toLowerCase().includes(lowercaseQuery)) ||
          community.category.toLowerCase().includes(lowercaseQuery)
      );

      setFilteredCommunities(matchingCommunities.slice(0, 4));
    } else {
      // Reset to default when search is empty
      setFilteredEvents(mockEvents.slice(0, 3));
      setFilteredNearbyEvents(mockEvents.slice(3, 6));
      setFilteredCommunities(communities.slice(0, 4));
    }
  }, [searchQuery, communities]);

  const handleJoinCommunity = (communityId: string) => {
    dispatch(toggleJoinCommunity(communityId));
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationModal(false);
  };

  const handleUseCurrentLocation = () => {
    // In a real app, this would use geolocation to get the user's current location
    // For this demo, we'll just set it to San Francisco
    setLocation('San Francisco, CA');
    setShowLocationModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() => setShowLocationModal(true)}
          >
            <MapPin size={18} color="#001B3A" />
            <Text style={styles.locationText}>{location}</Text>
            <ChevronDown size={16} color="#001B3A" />
          </TouchableOpacity>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search events, communities..."
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Events</Text>
            <TouchableOpacity onPress={() => router.push('/events')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {filteredEvents.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
            >
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => router.push(`/event/${event.id}`)}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No events match your search</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Communities</Text>
            <TouchableOpacity onPress={() => router.push('/communities')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {filteredCommunities.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
            >
              {filteredCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onPress={() => router.push(`/community/${community.id}`)}
                  onJoin={() => handleJoinCommunity(community.id)}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No communities match your search
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Events Near You</Text>
            <TouchableOpacity onPress={() => router.push('/events')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {filteredNearbyEvents.length > 0 ? (
            <View style={styles.nearbyEventsContainer}>
              {filteredNearbyEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => router.push(`/event/${event.id}`)}
                  variant="horizontal"
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No nearby events match your search
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Location Selection Modal */}
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <X size={24} color="#1E293B" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={handleUseCurrentLocation}
            >
              <Navigation size={20} color="#001B3A" />
              <Text style={styles.currentLocationText}>
                Use current location
              </Text>
            </TouchableOpacity>

            <Text style={styles.popularLocationsTitle}>Popular Locations</Text>

            <FlatList
              data={popularLocations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.locationItem,
                    location === item && styles.selectedLocationItem,
                  ]}
                  onPress={() => handleLocationSelect(item)}
                >
                  <MapPin
                    size={16}
                    color={location === item ? '#FFFFFF' : '#64748B'}
                  />
                  <Text
                    style={[
                      styles.locationItemText,
                      location === item && styles.selectedLocationItemText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.locationsList}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 6,
    marginRight: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001B3A',
  },
  horizontalList: {
    marginLeft: -8,
    paddingLeft: 8,
  },
  nearbyEventsContainer: {
    gap: 12,
  },
  emptyContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#001B3A',
    marginLeft: 12,
  },
  popularLocationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  locationsList: {
    maxHeight: 400,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedLocationItem: {
    backgroundColor: '#001B3A',
  },
  locationItemText: {
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  selectedLocationItemText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});