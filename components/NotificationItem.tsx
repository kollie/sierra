import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Notification } from '@/types';

interface NotificationItemProps {
  notification: Notification;
  onPress?: () => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        notification.read ? styles.readContainer : styles.unreadContainer
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: notification.avatar }} 
        style={styles.avatar}
      />
      <View style={styles.content}>
        <Text style={styles.message}>
          <Text style={styles.bold}>{notification.sender}</Text> {notification.message}
        </Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  unreadContainer: {
    backgroundColor: '#F1F5F9',
  },
  readContainer: {
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  message: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
  },
  time: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6366F1',
    alignSelf: 'center',
  },
});