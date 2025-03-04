import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin, Calendar, Users } from 'lucide-react-native';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
  variant?: 'vertical' | 'horizontal';
}

export function EventCard({ event, onPress, variant = 'vertical' }: EventCardProps) {
  if (variant === 'horizontal') {
    return (
      <TouchableOpacity 
        style={styles.horizontalContainer}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: event.image }} 
          style={styles.horizontalImage}
        />
        <View style={styles.horizontalContent}>
          <Text style={styles.horizontalTitle} numberOfLines={1}>{event.title}</Text>
          <View style={styles.horizontalDetail}>
            <Calendar size={14} color="#001B3A" />
            <Text style={styles.horizontalDetailText}>{event.date}</Text>
          </View>
          <View style={styles.horizontalDetail}>
            <MapPin size={14} color="#001B3A" />
            <Text style={styles.horizontalDetailText} numberOfLines={1}>{event.location}</Text>
          </View>
          <View style={styles.horizontalFooter}>
            <View style={styles.horizontalDetail}>
              <Users size={14} color="#001B3A" />
              <Text style={styles.horizontalDetailText}>{event.attendees} going</Text>
            </View>
            <Text style={styles.horizontalPrice}>
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: event.image }} 
        style={styles.image}
      />
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{event.category}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        <View style={styles.detail}>
          <Calendar size={14} color="#001B3A" />
          <Text style={styles.detailText}>{event.date}</Text>
        </View>
        <View style={styles.detail}>
          <MapPin size={14} color="#001B3A" />
          <Text style={styles.detailText} numberOfLines={1}>{event.location}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.attendeesContainer}>
            {event.attendeeAvatars.slice(0, 3).map((avatar, index) => (
              <Image 
                key={index}
                source={{ uri: avatar }} 
                style={[
                  styles.attendeeAvatar,
                  { marginLeft: index > 0 ? -8 : 0 }
                ]}
              />
            ))}
            {event.attendees > 3 && (
              <View style={styles.moreAttendeesContainer}>
                <Text style={styles.moreAttendeesText}>+{event.attendees - 3}</Text>
              </View>
            )}
          </View>
          <Text style={styles.price}>
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginRight: 16,
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 27, 58, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
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
    marginTop: 8,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  moreAttendeesContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  moreAttendeesText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#001B3A',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#001B3A',
  },
  
  // Horizontal variant styles
  horizontalContainer: {
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
  horizontalImage: {
    width: 100,
    height: 100,
  },
  horizontalContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  horizontalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  horizontalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  horizontalDetailText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 6,
  },
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  horizontalPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#001B3A',
  },
});