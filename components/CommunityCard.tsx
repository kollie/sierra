import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';
import { Community } from '@/types';
import { Button } from './Button';

interface CommunityCardProps {
  community: Community;
  onPress?: () => void;
  onJoin?: () => void;
}

export function CommunityCard({ community, onPress, onJoin }: CommunityCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: community.image }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{community.name}</Text>
        <View style={styles.detail}>
          <Users size={14} color="#001B3A" />
          <Text style={styles.detailText}>{community.members} members</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{community.category}</Text>
          </View>
          <Button
            title={community.joined ? "Joined" : "Join"}
            variant={community.joined ? "outline" : "primary"}
            size="small"
            onPress={(e) => {
              e.stopPropagation();
              onJoin && onJoin();
            }}
            style={styles.joinButton}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginRight: 16,
    marginBottom: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#001B3A',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  joinButton: {
    marginLeft: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});