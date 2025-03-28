import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';
import { Community } from '@/types';
import { Button } from './Button';

interface CommunityListItemProps {
  community: Community;
  onPress?: () => void;
  onJoin?: () => void;
}

export function CommunityListItem({ community, onPress, onJoin }: CommunityListItemProps) {
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
        <View>
          <Text style={styles.name}>{community.name}</Text>
          <View style={styles.detail}>
            <Users size={14} color="#001B3A" />
            <Text style={styles.detailText}>{community.members} members</Text>
          </View>
          <Text style={styles.description} numberOfLines={2}>{community.description}</Text>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 6,
  },
  description: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
  },
  joinButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
});