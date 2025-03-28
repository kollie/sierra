import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Calendar, Share2 } from 'lucide-react-native';
import { mockCommunities, mockEvents } from '@/data/mockData';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/Button';
import { useAppDispatch } from '@/store';
import { toggleJoinCommunity } from '@/store/community/actions';

export default function CommunityDetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams();
  
  const communityId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  const community = mockCommunities.find(c => c.id === communityId) || mockCommunities[0];
  
  // Get upcoming events for this community (mock data)
  const upcomingEvents = mockEvents.slice(0, 3);
  
  // Mock member data
  const members = [
    { id: '1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop' },
    { id: '2', name: 'Michael Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop' },
    { id: '3', name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3270&auto=format&fit=crop' },
    { id: '4', name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3270&auto=format&fit=crop' },
  ];

  const handleJoinCommunity = () => {
    dispatch(toggleJoinCommunity(communityId));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: community.image }} 
          style={styles.coverImage}
        />

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{community.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{community.category}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Users size={20} color="#001B3A" />
              <Text style={styles.statValue}>{community.members}</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Calendar size={20} color="#001B3A" />
              <Text style={styles.statValue}>{upcomingEvents.length}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{community.description}</Text>
          </View>

          {community.guidelines && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Community Guidelines</Text>
              <Text style={styles.description}>{community.guidelines}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <View style={styles.eventsContainer}>
              {upcomingEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onPress={() => router.push(`/event/${event.id}`)}
                  variant="horizontal"
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Members</Text>
            <View style={styles.membersGrid}>
              {members.map(member => (
                <View key={member.id} style={styles.memberItem}>
                  <Image 
                    source={{ uri: member.avatar }} 
                    style={styles.memberAvatar}
                  />
                  <Text style={styles.memberName}>{member.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title={community.joined ? "Leave Community" : "Join Community"}
          variant={community.joined ? "outline" : "primary"}
          onPress={handleJoinCommunity}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#001B3A',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  eventsContainer: {
    gap: 12,
  },
  membersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  memberItem: {
    width: '25%',
    padding: 8,
    alignItems: 'center',
  },
  memberAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 12,
    color: '#1E293B',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
});